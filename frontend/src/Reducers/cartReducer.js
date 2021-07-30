import { ADD_ITEM, DELETE_ITEM } from '../constant/cartConstant'

export const cartReducer = (state = { cartItems : []}, action) =>  {
   switch (action.type) {
       case ADD_ITEM:
           const Item = action.payload
           const existItem = state.cardItems.find(x => x.product === Item.product)
           if(existItem) {
              return {
                  ...state,
                  cartItems: state.cartItems.map( x => x.product === existItem.product ? Item : x)
              }
           } else {
              return {
                  ...state,
                  cartItems:[...state.cartItems, Item]
              }
           } 
   
       default:
           return state;
   }
}