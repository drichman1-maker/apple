/**
 * Unified Monitoring System for Price Aggregators
 * 
 * This module provides Reddit and Twitter monitoring for deal discovery
 * across all aggregator projects (MacTrackr, MintCondition, CoinCurator)
 * 
 * Integrates with n8n webhook workflow for automated alerts
 */

// Web search functionality - uses Brave API or similar
// In production, this would call an external search API
const web_search = async ({ query, count = 10, freshness = 'pw' }: { 
  query: string; 
  count?: number; 
  freshness?: string;
}) => {
  // Placeholder - implement with Brave API or similar
  console.log(`Searching: ${query}`);
  return [];
};

export interface MonitoringConfig {
  project: 'mactrackr' | 'mintcondition' | 'coincurator' | 'rumbledeals';
  redditSubreddits: string[];
  twitterHashtags: string[];
  keywords: string[];
  alertThreshold: 'low' | 'medium' | 'high';
}

export interface DealAlert {
  id: string;
  source: 'reddit' | 'twitter';
  project: string;
  title: string;
  url: string;
  price?: number;
  postedAt: string;
  engagement: number; // upvotes/retweets
  sentiment: 'positive' | 'neutral' | 'negative';
}

// Project-specific monitoring configurations
const MONITORING_CONFIGS: MonitoringConfig[] = [
  {
    project: 'mactrackr',
    redditSubreddits: ['macdeals', 'appleswap', 'buildapcsales', 'frugalmalefashion'],
    twitterHashtags: ['#macdeals', '#appledeals', '#macbook'],
    keywords: ['MacBook', 'iPad', 'iPhone', 'AirPods', 'deal', 'sale', 'price drop'],
    alertThreshold: 'medium'
  },
  {
    project: 'mintcondition',
    redditSubreddits: ['pkmntcgtrades', 'pokemontcg', 'pkmntcgdeals'],
    twitterHashtags: ['#pokemoncards', '#tcgdeals', '#pokemontcg'],
    keywords: ['Charizard', 'Pikachu', 'PSA', 'CGC', 'graded', 'holo', 'vintage'],
    alertThreshold: 'high'
  },
  {
    project: 'coincurator',
    redditSubreddits: ['coins', 'coincollecting', 'coins4sale'],
    twitterHashtags: ['#coincollecting', '#numismatics', '#rarecoins'],
    keywords: ['silver dollar', 'gold coin', 'graded', 'PCGS', 'NGC', 'morgan', 'peace dollar'],
    alertThreshold: 'medium'
  },
  {
    project: 'rumbledeals',
    redditSubreddits: ['GameDeals', 'NintendoSwitchDeals', 'PS5deals', 'XboxSeriesX'],
    twitterHashtags: ['#gamedeals', '#nintendoswitch', '#ps5deals'],
    keywords: ['Nintendo Switch', 'PS5', 'Xbox', 'game', 'deal', 'sale'],
    alertThreshold: 'low'
  }
];

export async function fetchRedditPosts(config: MonitoringConfig): Promise<DealAlert[]> {
  const alerts: DealAlert[] = [];
  
  for (const subreddit of config.redditSubreddits) {
    try {
      // Search for recent posts in the subreddit
      const searchQuery = `site:reddit.com/r/${subreddit} ${config.keywords.slice(0, 3).join(' OR ')}`;
      const results = await web_search({
        query: searchQuery,
        count: 10,
        freshness: 'pw' // Past week
      });
      
      // Transform results into DealAlert format
      for (const result of results) {
        alerts.push({
          id: `reddit_${subreddit}_${result.url}`,
          source: 'reddit',
          project: config.project,
          title: result.title,
          url: result.url,
          postedAt: new Date().toISOString(), // Approximate
          engagement: extractEngagement(result.snippet),
          sentiment: analyzeSentiment(result.snippet)
        });
      }
    } catch (error) {
      console.error(`Error fetching Reddit posts from r/${subreddit}:`, error);
    }
  }
  
  return alerts;
}

export async function fetchTwitterMentions(config: MonitoringConfig): Promise<DealAlert[]> {
  const alerts: DealAlert[] = [];
  
  for (const hashtag of config.twitterHashtags) {
    try {
      // Search for recent tweets with hashtag
      const searchQuery = `site:twitter.com ${hashtag} ${config.keywords.slice(0, 3).join(' OR ')}`;
      const results = await web_search({
        query: searchQuery,
        count: 10,
        freshness: 'pd' // Past day
      });
      
      // Transform results into DealAlert format
      for (const result of results) {
        alerts.push({
          id: `twitter_${hashtag}_${result.url}`,
          source: 'twitter',
          project: config.project,
          title: result.title,
          url: result.url,
          postedAt: new Date().toISOString(),
          engagement: extractEngagement(result.snippet),
          sentiment: analyzeSentiment(result.snippet)
        });
      }
    } catch (error) {
      console.error(`Error fetching Twitter mentions for ${hashtag}:`, error);
    }
  }
  
  return alerts;
}

function extractEngagement(snippet: string): number {
  // Extract numbers from snippet (upvotes, retweets, etc.)
  const matches = snippet.match(/(\d+)\s*(upvotes?|points?|retweets?|likes?)/i);
  return matches ? parseInt(matches[1]) : 0;
}

function analyzeSentiment(snippet: string): 'positive' | 'neutral' | 'negative' {
  const positiveWords = ['deal', 'great', 'amazing', 'best', 'sale', 'discount', 'steal'];
  const negativeWords = ['scam', 'overpriced', 'bad', 'terrible', 'avoid'];
  
  const lowerSnippet = snippet.toLowerCase();
  const positiveCount = positiveWords.filter(w => lowerSnippet.includes(w)).length;
  const negativeCount = negativeWords.filter(w => lowerSnippet.includes(w)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

export async function runMonitoringCycle(): Promise<DealAlert[]> {
  const allAlerts: DealAlert[] = [];
  
  for (const config of MONITORING_CONFIGS) {
    console.log(`Monitoring ${config.project}...`);
    
    const redditAlerts = await fetchRedditPosts(config);
    const twitterAlerts = await fetchTwitterMentions(config);
    
    allAlerts.push(...redditAlerts, ...twitterAlerts);
  }
  
  // Filter by engagement threshold
  const filteredAlerts = allAlerts.filter(alert => alert.engagement > 10);
  
  // Sort by engagement (highest first)
  return filteredAlerts.sort((a, b) => b.engagement - a.engagement);
}

export async function sendToN8NWebhook(alerts: DealAlert[], webhookUrl: string): Promise<void> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        alertCount: alerts.length,
        alerts: alerts.slice(0, 20) // Send top 20
      })
    });
    
    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status}`);
    }
    
    console.log(`Sent ${alerts.length} alerts to n8n webhook`);
  } catch (error) {
    console.error('Failed to send to n8n webhook:', error);
  }
}
