import express, { Router } from 'express'
import { ProductMaker } from '../../Controllers/Create/Product.js'
import { ProductUpdate } from '../../Controllers/Update/UpdateProduct.js'
import { ProductDelete } from '../../Controllers/Delete/DeleteDoc.js'
import { GetProducts } from '../../Controllers/Fetch/GetAllProducts.js'
import { upload } from '../../../MulterConfig.js'
import { GetProductById } from '../../Controllers/Fetch/GetSingleProduct.js'
import { GetProductsViaCatogory } from '../../Controllers/Fetch/GettingProductsofACatogory.js'
const ProductRouter = Router()
ProductRouter.post('/Create', upload.single('image'), ProductMaker)
ProductRouter.put('/Update', upload.single('image'), ProductUpdate)
ProductRouter.delete('/Delete/:ProductID', ProductDelete)
ProductRouter.get('/Get', GetProducts)
ProductRouter.get('/Single', GetProductById)
ProductRouter.get('/CatogoryProducts', GetProductsViaCatogory)
//Demo Url of Get :http://localhost:8000/api/Product/Get?UserEmail=haniaaaaa@gmail.com
//DEMO URL OF DELETE :http://localhost:8000/api/Product/Delete/a531ad55-e881-49fc-85fa-df995767375a?UserEmail=haniaaaaa@gmail.com
export default ProductRouter
