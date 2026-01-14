import { MongoClient, ServerApiVersion } from "mongodb"

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://mahendrasakpal_db_user:Mahendra@@1515@cluster0.z0q70lk.mongodb.net/?appName=Cluster0"

let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })

    await client.connect()
    await client.db("admin").command({ ping: 1 })

    const db = client.db("aurionpro_lms")

    cachedClient = client
    cachedDb = db

    return { client, db }
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw new Error("Failed to connect to MongoDB")
  }
}

export async function disconnectFromDatabase() {
  if (cachedClient) {
    await cachedClient.close()
    cachedClient = null
    cachedDb = null
  }
}
