const bcrypt = require('bcrypt')

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', bcrypt.genSaltSync()),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: bcrypt.hashSync('123456', bcrypt.genSaltSync()),
    },
    {
        name: 'Jane Doe',
        email: 'jane@gmail.com',
        password: bcrypt.hashSync('123456', bcrypt.genSaltSync()),
    },
    {
        name: 'Mike Ross',
        email: 'mike@gmail.com',
        password: bcrypt.hashSync('123456', bcrypt.genSaltSync()),
    },
]

module.exports = users