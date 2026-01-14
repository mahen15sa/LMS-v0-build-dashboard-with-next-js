import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { db } = await connectToDatabase()

    const collection = db.collection("system_parameters")

    const record = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "PENDING_AUTHORIZATION",
      maker: "USER001", // Replace with actual user ID from session
      checker: null,
      authorizedAt: null,
      rejectionReason: null,
    }

    const result = await collection.insertOne(record)

    return NextResponse.json(
      {
        success: true,
        message: "System Parameter submitted successfully",
        recordId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error submitting system parameter:", error)
    return NextResponse.json({ success: false, message: "Failed to submit system parameter" }, { status: 500 })
  }
}
