import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { recordId, rejectionReason } = body
    const { db } = await connectToDatabase()

    const collection = db.collection("system_parameters")

    const result = await collection.updateOne(
      { _id: new ObjectId(recordId) },
      {
        $set: {
          status: "REJECTED",
          checker: "CHECKER001", // Replace with actual user ID
          rejectionReason,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Record not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Record rejected successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error rejecting record:", error)
    return NextResponse.json({ success: false, message: "Failed to reject record" }, { status: 500 })
  }
}
