import {GET_ERRORS, GET_NETWORK_ERRORS, LOGIN_FAILURE, RUD_PHOTO_FAILURE} from '../actions/types';

const initialState = {
  server_errors: {},
  network_errors: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
    case LOGIN_FAILURE:
    case RUD_PHOTO_FAILURE:
      return {
        server_errors: action.payload,
      };
    case GET_NETWORK_ERRORS:
      console.log('PAYLOAD IS...', action.payload);
      return {
        network_errors: action.payload,
      };
    default:
      return state;
  }
}
