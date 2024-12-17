import mongoose from 'mongoose'
import csv from 'csv-parser'
import fs from 'fs'
import { DB_CONNECTED } from './DB_Connect.js'
import DummyModel from './DB/Models/Dummy.js'
// Adjust the path to your Course model
const importCSVtoMongo = async () => {
  try {
    // Connect to MongoDB
    await DB_CONNECTED()
    const results = []
    // Read the CSV file
    fs.createReadStream('./Global Grads Website Form - Consultation Form.csv') // Replace with your CSV file path
      .pipe(csv())
      .on('data', (row) => {
        // Convert all fields to string
        const rowData = Object.fromEntries(
          Object.entries(row).map(([key, value]) => [key, String(value)])
        )
        results.push(rowData)
      })
      .on('end', async () => {
        try {
          // Insert data into MongoDB
          await DummyModel.insertMany(results)
          console.log('Data imported successfully!')
        } catch (err) {
          console.error('Error inserting data into MongoDB:', err)
        } finally {
          mongoose.connection.close() // Close the connection
        }
      })
  } catch (err) {
    console.error('Error during the import process:', err)
  }
}
// Call the function to start the import
importCSVtoMongo()
