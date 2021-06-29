import { commentConstants } from '../_constants/comment.constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { refId: user._id, comment: " "} : {refId: " "};

export function contact(state = initialState, action) {
  switch (action.type) {
    case commentConstants.ADD_COMMENT_REQUEST:
      return {
           ...state,
        comment: action.user.comment
      };
    case commentConstants.ADD_COMMENT_SUCCESS:
      return {
        ...state,
     comment: action.user.comment
       };
    case commentConstants.ADD_COMMENT_FAILURE:
      return {};
    default:
      return state
  }
}