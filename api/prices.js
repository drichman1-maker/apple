import fs from 'fs'
import path from 'path'

export async function GET() {
  const pricesPath = path.join(process.cwd(), 'data/prices/theresmac.jsonl')
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
    
    return new Response(JSON.stringify({
      project: 'theresmac',
      prices,
      lastUpdated: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to read prices' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}