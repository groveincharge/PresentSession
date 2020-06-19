import { productConstants } from '../_constants';

export function allProduct(state = [], action) {
  switch (action.type) {
    case productConstants.GETALL_PRODUCT_REQUEST:
      return {
        loading: true,
        items: Object.assign({}, action.items)
      };
    case productConstants.GETALL_PRODUCT_SUCCESS:
      return {
        items: Object.assign(state, action.items)
      };
    case productConstants.GETALL_PRODUCT_FAILURE:
      return { 
        error: action.error
      };
    case productConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id
            ? { ...item, deleting: true }
            : item
        )
      };
    case productConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(product => product.id !== action.id)
      };
    case productConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(product => {
          if (product.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = product;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return product;
        })
      };
    default:
      return state
  }
}