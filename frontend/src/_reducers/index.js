import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { logout } from './logout.reducer';
import { users } from './users.reducer';
import { product } from './product.reducer';
import { allProduct } from './allProduct.reducer';
import { cart } from './cart.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  logout,
  users,
  product,
  allProduct,
  cart,
  alert
});

export default rootReducer;