import {
    PRODUCT_LIST_ERROR,
    PRODUCT_LIST_WAITING,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_ERROR,
    PRODUCT_DETAILS_WAITING,
    PRODUCT_DETAILS_SUCCESS
} from '../actions/actionTypes'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_WAITING: {
            return {
                loading: true,
            }
        }

        case PRODUCT_LIST_SUCCESS: {
            return {
                loading: false,
                products: action.payload
            }
        }

        case PRODUCT_LIST_ERROR: {
            return {
                error: action.err
            }
        }

        default: {
            return state
        }
    }
}

export const productDetailsReducer = (state = { product: { rating: 0 } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_WAITING: {
            return {
                loading: true,
            }
        }

        case PRODUCT_DETAILS_SUCCESS: {
            return {
                loading: false,
                product: action.payload
            }
        }

        case PRODUCT_DETAILS_ERROR: {
            return {
                error: action.err
            }
        }

        default: {
            return state
        }
    }
}