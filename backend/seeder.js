import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    const savedUsers = await User.insertMany(users)
    const adminUser = savedUsers[0]._id

    const allProducts = products.map((p) => {
      return { ...p, user: adminUser }
    })

    await Product.insertMany(allProducts)

    console.log('Data Imported !!!'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(error.message.red.inverse)
    process.exit(1)
  }
}

const deleteData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    console.log('Data Deleted !!!'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(error.message.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  deleteData()
} else {
  importData()
}
