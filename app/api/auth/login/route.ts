import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Mock authentication logic
    if (username && password) {
      return NextResponse.json({
        success: true,
        message: "Login successful",
        user: {
          id: "1",
          username: username,
          name: "James Bond",
          role: "Admin",
        },
      })
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
