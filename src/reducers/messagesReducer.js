import {LOGOUT_SUCCESS, GET_INFO_MESSAGE, GET_SUCCESS_MESSAGE} from '../actions/types';

const initialState = {
  success_message: '',
  info_message: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      console.log('Reducer got logout success');
    case GET_SUCCESS_MESSAGE:
      console.log('Reducer got success message');
      return {
        success_message: action.payload,
      };
    case GET_INFO_MESSAGE:
      return {
        info_message: action.payload,
      };
    default:
      return state;
  }
}
