const express = require('express')
const router = express.Router()
const Product =  require('../models/Products')

router.post('/', async(req, res ) =>{
    try {
        const newProduct = await Product.create(req.body)
        res.status(201).json(newProduct)
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});

router.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(updatedProduct)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});


router.delete('/api/products:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/api/products' , async (req, res) =>{
    try{
        const {
            category,
            minPrice,
            maxPrice,
            sortBy,
            page = 1,
            limit = 10
        } = req.query

        const filter = {}
        if(category){
            filter.category = category
        }

        if(minPrice || maxPrice){
            filter.price = {}
            if(minPrice) filter.price.$gte = Number(minPrice)
            if(maxPrice) filter.price.$lte = Number(maxPrice)
        }

        let sort ={}
        if(sortBy === 'price_asc') sort.price = 1
        if(sortBy === 'price_desc') sort.price = -1

        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const skip = (pageNumber - 1) * limitNumber

        const products = await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limitNumber)

        res.status(200).json(products)
    }catch(error){
        res.status(500).json({message: 'Failed to fetch products!!'})
    }
})