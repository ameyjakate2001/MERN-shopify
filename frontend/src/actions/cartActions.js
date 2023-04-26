import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_ADD_SHIPPING_ADDRESS, CART_ADD_PAYMENT_METHOD } from '../actions/actionTypes'

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            quantity: quantity,
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock
        }
    })

    localStorage.setItem('cart-items', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cart-items', JSON.stringify(getState().cart.cartItems))
}

export const addShippingAddress = (data) => async (dispatch, getState) => {
    dispatch({
        type: CART_ADD_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shipping-address', JSON.stringify(getState().cart.shippingAddress))
}

export const addPaymentMethod = (data) => async (dispatch, getState) => {
    dispatch({
        type: CART_ADD_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('payment-method', JSON.stringify(getState().cart.paymentMethod))
}