import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../FireBase.js'

export const GetProductsViaCatogory = async (req, res) => {
  try {
    const { UserEmail, category } = req.query

    // Check if UserEmail is provided
    if (!UserEmail) {
      return res.status(400).json({ error: 'UserEmail is required' })
    }

    // Reference to the 'Product' collection
    const productCollectionRef = collection(db, 'Product')

    // Build the query with an optional category filter
    let productsQuery = query(productCollectionRef)
    if (category) {
      productsQuery = query(
        productCollectionRef,
        where('Category', '==', category)
      )
    }

    // Fetch documents based on the query
    const querySnapshot = await getDocs(productsQuery)

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
