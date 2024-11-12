import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../FireBase.js'
export const GetUsers = async (req, res) => {
  try {
    const { UserEmail } = req.query
    // Check if UserEmail is provided
    if (!UserEmail) {
      return res.status(400).json({ error: 'UserEmail is required' })
    }
    // Reference to the 'USERS' collection
    const USERSCollectionRef = collection(db, 'USERS')
    // Fetch all documents from the 'USERS' collection
    const querySnapshot = await getDocs(USERSCollectionRef)
    // Map the documents to an array of objects
    const USERS = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document data
    }))
    // Return the array of USERSs
    res.status(200).json(USERS)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to fetch USERSs' })
  }
}
