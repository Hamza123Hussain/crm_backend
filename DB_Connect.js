import mongoose from 'mongoose';
import { Mongo_url } from './Config.js';
import dns from 'node:dns';

// Fix for Node.js 18+ DNS resolution issues
dns.setDefaultResultOrder('ipv4first');

export const DB_CONNECTED = async () => {
  try {
    // Ensure Mongo_url is actually defined before trying to connect
    if (!Mongo_url) {
      throw new Error("Mongo_url is undefined. Check your .env or Config.js");
    }

    const connectionInstance = await mongoose.connect('mongodb://octtoppus1:OCTTOPPUS1@gg1208crm-shard-00-00.dy2kw.mongodb.net:27017,gg1208crm-shard-00-01.dy2kw.mongodb.net:27017,gg1208crm-shard-00-02.dy2kw.mongodb.net:27017/?ssl=true&replicaSet=atlas-wzyvfz-shard-0&authSource=admin&appName=GG1208CRM');
    
    console.log(`DB CONNECTED: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error('DB CONNECTION ERROR:', error.message);
    // Log the full error to see if it's still syscall: 'querySrv'
    console.log(error); 
  }
};