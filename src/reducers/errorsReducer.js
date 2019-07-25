import {GET_ERRORS, GET_NETWORK_ERRORS} from '../actions/types';

const initialState = {
  server_errors: {},
  network_errors: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
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
