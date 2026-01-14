import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection("system_parameters")

    const status = request.nextUrl.searchParams.get("status") || "PENDING_AUTHORIZATION"

    const records = await collection.find({ status }).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ success: true, data: records }, { status: 200 })
  } catch (error) {
    console.error("Error fetching system parameters:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch system parameters" }, { status: 500 })
  }
}
