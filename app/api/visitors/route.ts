import { NextRequest, NextResponse } from 'next/server'

// In-memory storage (for demo purposes)
// In production, you'd want to use a database like MongoDB, PostgreSQL, etc.
let visitorData = {
  totalVisits: 0,
  uniqueVisitors: new Set(),
  visitHistory: [] as Array<{
    timestamp: string
    ip: string
    userAgent: string
    sessionId: string
  }>
}

// Initialize with some seed data to make it look realistic
if (visitorData.totalVisits === 0) {
  visitorData.totalVisits = Math.floor(Math.random() * 500) + 200
  visitorData.uniqueVisitors = new Set(
    Array.from({ length: Math.floor(Math.random() * 100) + 50 }, (_, i) => `visitor_${i}`)
  )
}

export async function GET() {
  try {
    return NextResponse.json({
      totalVisits: visitorData.totalVisits,
      uniqueVisitors: visitorData.uniqueVisitors.size,
      lastUpdate: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching visitor data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch visitor data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, visitorId } = body
    
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Get user agent
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    // Track the visit
    visitorData.totalVisits++
    
    // Add to unique visitors if new
    if (visitorId && !visitorData.uniqueVisitors.has(visitorId)) {
      visitorData.uniqueVisitors.add(visitorId)
    }
    
    // Add to visit history
    visitorData.visitHistory.push({
      timestamp: new Date().toISOString(),
      ip: ip.split(',')[0], // Take first IP if multiple
      userAgent,
      sessionId: sessionId || 'unknown'
    })
    
    // Keep only last 1000 visits to prevent memory issues
    if (visitorData.visitHistory.length > 1000) {
      visitorData.visitHistory = visitorData.visitHistory.slice(-1000)
    }
    
    return NextResponse.json({
      success: true,
      totalVisits: visitorData.totalVisits,
      uniqueVisitors: visitorData.uniqueVisitors.size,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error tracking visitor:', error)
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    )
  }
}
