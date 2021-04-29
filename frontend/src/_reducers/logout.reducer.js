import { userConstants } from '../_constants';

export function logout(state = {}, action) {
    switch (action.type) {
      case userConstants.LOGOUT_REQUEST:
        return { loggingOut: true };
      case userConstants.LOGOUT_SUCCESS:
        return {};
      case userConstants.LOGOUT_FAILURE:
        return {};
      default:
        return state
    }
  }