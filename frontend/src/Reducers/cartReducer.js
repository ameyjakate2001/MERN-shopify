import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constant/cartConstant'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const Item = action.payload
      const existItem = state.cartItems.find((x) => x.product === Item.product)
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? Item : x
          )
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, Item],
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }

    default:
      return state
  }
}
