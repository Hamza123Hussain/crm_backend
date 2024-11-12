import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../FireBase.js'
export const GetCatorgories = async (req, res) => {
  try {
    const { UserEmail } = req.query
    // Check if UserEmail is provided
    if (!UserEmail) {
      return res.status(400).json({ error: 'UserEmail is required' })
    }
    // Reference to the 'Category' collection
    const CategoryCollectionRef = collection(db, 'Catorgory')
    // Fetch all documents from the 'Category' collection
    const querySnapshot = await getDocs(CategoryCollectionRef)
    // Map the documents to an array of objects
    const Categorys = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document data
    }))
    // Return the array of Categorys
    res.status(200).json(Categorys)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to fetch Categorys' })
  }
}
