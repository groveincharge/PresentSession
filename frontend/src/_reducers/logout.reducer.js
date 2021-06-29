import { userConstants } from '../_constants';

let loggedOut = JSON.parse(localStorage.getItem('loggedOut'));
const initialState = !loggedOut? {loggedOut} : true;

export function logout(state = initialState, action) {
    switch (action.type) {
      case userConstants.LOGOUT_REQUEST:
        return { loggingOut: true };
      case userConstants.LOGOUT_SUCCESS:
        return {
          loggedOut: Object.assign(state, !action.loggedOut)
        };
      case userConstants.LOGOUT_FAILURE:
        return {};
      default:
        return state
    }
  }