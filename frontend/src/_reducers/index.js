import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { product } from './product.reducer';
import { allProduct } from './allProduct.reducer';
import { cartReducer } from './cart.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  product,
  allProduct,
  cartReducer,
  alert
});

export default rootReducer;