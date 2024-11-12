import { doc, setDoc } from 'firebase/firestore'
import { db, Storage } from '../../../FireBase.js'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
export const ProductMaker = async (req, res) => {
  try {
    const { ProductName, UserEmail, Category, UserName } = req.body
    const file = req.file

    const ProductID = uuid()
    // Check if UserEmail and ProductName are provided
    if (!UserEmail || !ProductName) {
      return res
        .status(400)
        .json({ error: 'UserEmail and ProductName are required' })
    }

    let imageUrl = ''

    if (file) {
      // Create a unique file name
      const fileRef = ref(Storage, `Product/${ProductName}`)

      // Upload file to Firebase Storage
      await uploadBytes(fileRef, file.buffer)
      imageUrl = await getDownloadURL(fileRef) // Get the download URL for the uploaded file
    }

    // Save the new Product to Firestore
    await setDoc(doc(db, 'Product', ProductID), {
      Name: ProductName,
      MadeBY: UserName,
      Category,
      ImageUrl: imageUrl,
      ID: ProductID, // Consider using a dynamic or unique ID if applicable
    })

    res.status(200).json({ ProductName, UserEmail })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to create Product' })
  }
}
