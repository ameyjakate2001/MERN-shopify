import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_ADD_SHIPPING_ADDRESS, CART_ADD_PAYMENT_METHOD } from '../actions/actionTypes'

export const cartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: '' }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM: {
            const item = action.payload

            const itemExisting = state.cartItems.find(i => i.product === item.product)

            if (itemExisting) {
                const updatedCartItems = state.cartItems.map(i => i.product === item.product ? item : i)

                return {
                    ...state,
                    cartItems: updatedCartItems
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        }

        case CART_REMOVE_ITEM: {
            const id = action.payload

            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.product !== id)
            }
        }

        case CART_ADD_SHIPPING_ADDRESS: {
            return {
                ...state,
                shippingAddress: action.payload
            }
        }

        case CART_ADD_PAYMENT_METHOD: {
            return {
                ...state,
                paymentMethod: action.payload
            }
        }

        default: {
            return state
        }
    }
}