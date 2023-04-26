const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'please enter email'],
        unique: true,
        validate: [isEmail, 'please enter valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter password'],
        minLength: [6, 'Minimum valid length for password is 6']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }

}, {
    timestamps: true,
})

// pre is a mongoose middelware, thus next() called
userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })

    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (isPasswordValid) {
            return user
        }

        throw "invalid password"
    }

    throw "invalid email"
}

const User = mongoose.model('User', userSchema)

module.exports = User