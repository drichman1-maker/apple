import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 3002

// Read prices from JSONL file
function getPrices() {
  const pricesPath = path.join(__dirname, '../data/prices/mactrackr.jsonl')
  try {
    const content = fs.readFileSync(pricesPath, 'utf-8')
    const lines = content.trim().split('\n')
    const prices = lines.map(line => {
      try {
        return JSON.parse(line)
      } catch {
        return null
      }
    }).filter(Boolean)
    return prices
  } catch (error) {
    console.error('Error reading prices:', error)
    return []
  }
}

const server = http.createServer((req, res) => {
  if (req.url === '/api/prices' && req.method === 'GET') {
    res.writeHead(200, { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
    const prices = getPrices()
    res.end(JSON.stringify({
      project: 'mactrackr',
      prices,
      lastUpdated: new Date().toISOString()
    }))
  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

server.listen(PORT, () => {
  console.log(`💰 Mactrackr prices API running on http://localhost:${PORT}/api/prices`)
})
