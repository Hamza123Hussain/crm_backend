import { doc, updateDoc } from 'firebase/firestore'
import { db, Storage } from '../../../FireBase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const ProductUpdate = async (req, res) => {
  try {
    const { ProductName, ProductID, UserEmail, Category, UserName } = req.body
    const file = req.file // Image file if provided

    // Check if essential data is provided
    if (!UserEmail || !ProductName || !ProductID) {
      return res
        .status(400)
        .json({ error: 'UserEmail, ProductName, and ProductID are required' })
    }

    let imageUrl = ''

    // Check if a file is provided and handle file upload
    if (file) {
      const fileRef = ref(Storage, `Product/${ProductName}_${Date.now()}`)
      await uploadBytes(fileRef, file.buffer)
      imageUrl = await getDownloadURL(fileRef)
    }

    // Prepare the fields to be updated
    const updateFields = {
      Name: ProductName,
      MadeBY: UserName,
      Category,
    }

    // Only add ImageUrl to update fields if an image was provided
    if (imageUrl) {
      updateFields.ImageUrl = imageUrl
    }

    // Update the product document in Firestore
    await updateDoc(doc(db, 'Product', ProductID), updateFields)

    res.status(200).json({ Message: 'PRODUCT HAS BEEN UPDATED' })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to update Product' })
  }
}
