import express from 'express'
import { CategoryMaker } from '../../Controllers/Create/CreatingCategory.js'
import { upload } from '../../../MulterConfig.js'
import { GetCatorgories } from '../../Controllers/Fetch/GetAllCatorgories.js'

const CategoryRouter = express.Router()

CategoryRouter.post('/', upload.single('image'), CategoryMaker)
CategoryRouter.get('/Get', GetCatorgories)
//Demo Url of Get :http://localhost:8000/api/Product/Get?UserEmail=haniaaaaa@gmail.com
export default CategoryRouter
