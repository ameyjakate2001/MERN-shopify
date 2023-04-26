import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userSignupReducer, userUpdateReducer } from './reducers/userReducers'

const storedCartItems = localStorage.getItem('cart-items') ? JSON.parse(localStorage.getItem('cart-items')) : []
const storedShippingAddress = localStorage.getItem('shipping-address') ? JSON.parse(localStorage.getItem('shipping-address')) : {}
const storedPaymentMethod = localStorage.getItem('payment-Method') ? JSON.parse(localStorage.getItem('payment-Method')) : ''

const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    userUpdate: userUpdateReducer
})

const initialState = {
    cart: {
        cartItems: storedCartItems,
        shippingAddress: storedShippingAddress,
        paymentMethod: storedPaymentMethod
    }
}

const middelwares = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middelwares)))

export default store