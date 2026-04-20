/**
 * CLI entry point for the scraper.
 * Usage: npx tsx src/run.ts --site theresmac [--dry-run] [--limit N]
 */
import { runScraper } from './runner.js';

function parseArgs() {
  const args = process.argv.slice(2);
  let site = '';
  let dryRun = false;
  let limit: number | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const next = args[i + 1];
    if (arg === '--site' && next) {
      site = next;
      i++;
    } else if (arg === '--dry-run') {
      dryRun = true;
    } else if (arg === '--limit' && next) {
      limit = parseInt(next, 10);
      i++;
    }
  }

  return { site, dryRun, limit };
}

const { site, dryRun, limit } = parseArgs();

if (!site) {
  console.error('Usage: tsx src/run.ts --site <theresmac|gpudrip> [--dry-run] [--limit N]');
  process.exit(1);
}

runScraper(site, { dryRun, limit })
  .then(report => {
    const enabledAdapters = Object.keys(report.adapters).length;
    // Alert only when a majority of adapters are broken (isolated retailer outage != pipeline failure)
    if (enabledAdapters > 0 && report.brokenAdapters.length >= Math.ceil(enabledAdapters / 2)) {
      console.error(`\nExiting non-zero: ${report.brokenAdapters.length}/${enabledAdapters} adapters returned zero successes.`);
      process.exit(2);
    }
  })
  .catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
