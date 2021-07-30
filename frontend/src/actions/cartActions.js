import { ADD_ITEM } from '../constant/cartConstant'
import axios from 'axios'

export const AddToCart = (id, qty) => async(dispatch, getState) => {
   const { data } = await axios.get(`/api/products/${id}`)

   dispatch({ 
       type:  ADD_ITEM,
       payload: {
            product : data._id,
            name: data.name,
            image : data.image,
            price: data.price,
            countInStock : data.countInStock,
            qty
   }
})

   localStorage.setItem('cartItems', JSON.stringify(JSONgetState().cart.cartItems))
}