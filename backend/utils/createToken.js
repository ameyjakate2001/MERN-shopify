const jwt = require('jsonwebtoken')

const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })

    return token
}

module.exports = createToken