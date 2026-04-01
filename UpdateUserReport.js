import { MongoClient } from 'mongodb'

// MongoDB connection string
const uri =
  'mongodb+srv://octtoppus1:OCTTOPPUS1@gg1208crm.dy2kw.mongodb.net/?retryWrites=true&w=majority&appName=GG1208CRM'

async function updateDocuments() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db('test')
    const collection = db.collection('contactreminders')

    // Filter:
    // ContactedDate >= 2026-01-08
    // AND UserID > 1943
    const filter = {
      ContactedDate: { $gte: new Date('2026-01-08T00:00:00Z') },
      UserID: { $gt: 1943 },
    }

    // Update: set UpdatedBy to empty string
    const update = {
      $set: { UpdatedBy: '' },
    }

    const result = await collection.updateMany(filter, update)

    console.log(`Matched ${result.matchedCount} documents`)
    console.log(`Modified ${result.modifiedCount} documents`)
  } catch (err) {
    console.error('Error updating documents:', err)
  } finally {
    await client.close()
  }
}

// Run the function
updateDocuments()
