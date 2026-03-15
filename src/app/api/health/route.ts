import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test basic functionality
    const testResults = {
      timestamp: new Date().toISOString(),
      status: 'healthy',
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      checks: {
        api: 'checking...',
        database: 'checking...',
        resources: 'checking...'
      }
    }

    return NextResponse.json(testResults, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        environment: process.env.NODE_ENV || 'development',
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
