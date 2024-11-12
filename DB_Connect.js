import mongoose from 'mongoose'
import { Mongo_url } from './Config.js'

export const DB_CONNECTED = async () => {
  try {
    const data = await mongoose.connect(Mongo_url)
    if (data) console.log('DB CONNECTED')
  } catch (error) {
    console.log('DB ERROR', error)
  }
}
