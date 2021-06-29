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
        ...state,
        prod: action.prod
      };
    case productConstants.ADD_PRODUCT_SUCCESS:
      return {
        requesting: false,
        ...state,
        prod: action.prod
      };
    case productConstants.ADD_PRODUCT_FAILURE:
      return {};
    default:
      return state
  }
}