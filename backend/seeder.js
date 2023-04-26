const products = require('./data/Products')
const users = require('./data/Users')
const User = require('./models/userSchema')
const Product = require('./models/productSchema')
const dotenv = require('dotenv')
const connectDB = require('./db/db')

dotenv.config()

connectDB()

const addData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUserId = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return {
                ...product,
                user: adminUserId
            }
        })

        await Product.insertMany(sampleProducts)

        console.log('data added to database')
        process.exit()

    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

addData()