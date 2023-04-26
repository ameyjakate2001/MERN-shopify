const Product = require('../models/productSchema')

// @desc   Get all products
// @route  /api/products
// @access Public
const getProducts = async (req, res) => {
  const data = await Product.find()
  console.log(data)
  res.json(data)
}

// @desc   Get single product
// @route  /api/products/:id
// @access Public
const getProductDetail = async (req, res) => {
  const id = req.params.id
  const product = await Product.findById(id)

  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
}

module.exports = { getProducts, getProductDetail }
