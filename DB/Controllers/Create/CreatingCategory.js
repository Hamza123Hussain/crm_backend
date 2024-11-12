import { doc, setDoc } from 'firebase/firestore'
import { db, Storage } from '../../../FireBase.js'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
export const CategoryMaker = async (req, res) => {
  try {
    const { CategoryName, UserEmail, UserName } = req.body
    const file = req.file

    const CatogoryID = uuid()
    // Check if UserEmail and ProductName are provided
    if (!UserEmail || !CategoryName) {
      return res
        .status(400)
        .json({ error: 'UserEmail and ProductName are required' })
    }

    let imageUrl = ''

    if (file) {
      // Create a unique file name
      const fileRef = ref(Storage, `Catogory/${CategoryName}`)

      // Upload file to Firebase Storage
      await uploadBytes(fileRef, file.buffer)
      imageUrl = await getDownloadURL(fileRef) // Get the download URL for the uploaded file
    }

    // Save the new Product to Firestore
    await setDoc(doc(db, 'Catorgory', CategoryName), {
      Name: CategoryName,
      MadeBY: UserName,
      imageUrl,
      ID: CatogoryID, // Consider using a dynamic or unique ID if applicable
    })

    res.status(200).json({ CategoryName, UserEmail })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to create Product' })
  }
}
