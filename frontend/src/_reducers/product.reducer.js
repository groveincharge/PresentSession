import { productConstants } from '../_constants';

const initialState = {
  itemName: " ",
  itemPrice: 0.0,
  toFilePath: " "
};

export function product(state = initialState, action) {
  switch (action.type) {
    case productConstants.ADD_PRODUCT_REQUEST:
      return {
        requesting: true,
        product: Object.assign({}, state)
      };
    case productConstants.ADD_PRODUCT_SUCCESS:
      return {
        product: Object.assign({}, state, action.product)
      };
    case productConstants.ADD_PRODUCT_FAILURE:
      return {};
    default:
      return state
  }
}