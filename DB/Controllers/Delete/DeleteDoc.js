import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../FireBase.js'

export const ProductDelete = async (req, res) => {
  try {
    const { ProductID } = req.params
    const { UserEmail } = req.query

    // Check if ProductID and UserEmail are provided
    if (!ProductID || !UserEmail) {
      return res
        .status(400)
        .json({ error: 'ProductID and UserEmail are required' })
    }

    // Delete the product from Firestore
    await deleteDoc(doc(db, 'Product', ProductID))

    res.status(200).json(true)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to delete product' })
  }
}
