const handleErrors = (err) => {

    const errorData = {
        type: 'error',
        email: '',
        password: ''
    }

    //Sign In Error Handling

    if (err === 'invalid email') {
        errorData.email = 'Email is invalid'
        return errorData
    }

    if (err === 'invalid password') {
        errorData.password = 'password is invalid'
        return errorData
    }

    // SignUp Error Handling

    // In case email is already registered    
    if (err.code === 11000) {
        errorData.email = 'Email alredy registered'
        return errorData
    }

    if (err.errors) {
        const errorObject = err.errors
        Object.keys(errorObject).map((i) => {
            errorData[i] = errorObject[i].properties.message
        })
    }

    return errorData
}

module.exports = handleErrors