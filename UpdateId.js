import { MongoClient } from 'mongodb'
import 'dotenv/config'

async function updateDocumentId(oldId, newId) {
  const client = new MongoClient(process.env.Mongo_url) // Use your MongoDB connection string here

  try {
    await client.connect()

    const database = client.db('test') // Replace with your database name
    const collection = database.collection('students') // Replace with your collection name

    // Step 1: Retrieve the document with the old _id
    const document = await collection.findOne({ _id: oldId })

    if (!document) {
      console.log(`No document found with _id: ${oldId}`)
      return
    }

    // Step 2: Delete the original document
    const deleteResult = await collection.deleteOne({ _id: oldId })

    if (deleteResult.deletedCount === 0) {
      console.error(`Failed to delete document with _id: ${oldId}`)
      return
    }

    console.log(`Document with _id: ${oldId} deleted successfully.`)

    // Step 3: Insert the document with the new _id
    document._id = newId // Update the _id to the new one
    await collection.insertOne(document)

    console.log(`Document successfully inserted with new _id: ${newId}`)
  } catch (err) {
    console.error('Error updating _id:', err)
  } finally {
    await client.close()
  }
}

// Call the function with valid _id values
updateDocumentId(1478, 1477) // Replace with your actual IDs
