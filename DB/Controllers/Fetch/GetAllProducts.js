import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../FireBase.js'
export const GetProducts = async (req, res) => {
  try {
    const { UserEmail } = req.query
    // Check if UserEmail is provided
    if (!UserEmail) {
      return res.status(400).json({ error: 'UserEmail is required' })
    }
    // Reference to the 'Product' collection
    const productCollectionRef = collection(db, 'Product')
    // Fetch all documents from the 'Product' collection
    const querySnapshot = await getDocs(productCollectionRef)
    // Map the documents to an array of objects
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document data
    }))
    // Return the array of products
    res.status(200).json(products)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
}
