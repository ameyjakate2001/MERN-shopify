import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'amey jakate',
    email: 'amey@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'akshara jakate',
    email: 'akshara@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
