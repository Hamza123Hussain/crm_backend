// multer-config.js
import multer from 'multer'

const storage = multer.memoryStorage() // Use memory storage for file uploads
const upload = multer({ storage })

export { upload }
