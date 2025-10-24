import { NextResponse } from 'next/server'

export async function GET() {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/api/graphql'
  const sandboxURL = `https://studio.apollographql.com/sandbox/explorer?endpoint=${encodeURIComponent(endpoint)}`
  return NextResponse.redirect(sandboxURL)
}
