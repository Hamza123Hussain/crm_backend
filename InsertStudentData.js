import csv from 'csvtojson'
import mongoose from 'mongoose'
import { OldStudents } from './DB/Models/OldStudents.js'
import { Mongo_url } from './Config.js'
const MyModel = mongoose.model('OldStudent', OldStudents)
async function importCSV() {
  try {
    await mongoose.connect(Mongo_url)
    console.log('MongoDB connected')
    const jsonArray = await csv().fromFile('./oldstudents.csv')
    await MyModel.insertMany(jsonArray)
    console.log('CSV data inserted into MongoDB')
    process.exit()
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  }
}

importCSV()
