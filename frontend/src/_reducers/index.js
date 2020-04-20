import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { product } from './product.reducer';
import { getproducts } from './getproducts.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  product,
  getproducts,
  alert
});

export default rootReducer;