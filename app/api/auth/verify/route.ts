import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { code, mode } = body

    // Mock verification logic
    if (code && mode) {
      return NextResponse.json({
        success: true,
        message: "Verification successful",
        token: "mock-jwt-token",
      })
    }

    return NextResponse.json({ success: false, message: "Invalid verification code" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
