import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../FireBase.js'

export const GetProductById = async (req, res) => {
  try {
    const { productId } = req.query

    // Check if productId is provided
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' })
    }

    // Reference to the specific product document by ID
    const productDocRef = doc(db, 'Product', productId)

    // Fetch the document from Firestore
    const productDoc = await getDoc(productDocRef)

    // Check if the product exists
    if (!productDoc.exists()) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Get the product data
    const productData = {
      id: productDoc.id,
      ...productDoc.data(),
    }

    // Return the product data
    res.status(200).json(productData)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
}
