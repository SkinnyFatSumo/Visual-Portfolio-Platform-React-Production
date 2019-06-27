import {
  ALL_USERS_SUCCESS,
  ALL_USERS_LOADING,
  ALL_USERS_FAILURE,
  USER_INFO_SUCCESS,
  USER_INFO_LOADING,
  USER_INFO_FAILURE,
  FAVORITES_SUCCESS,
  FAVORITES_LOADING,
  FAVORITES_FAILURE,
  VIEWING_USER_SUCCESS,
  VIEWING_USER_FAILURE,
} from '../actions/types';

const initialState = {
  allUsersLoaded: false,
  users: [],
  isViewing: null,
  validUser: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ALL_USERS_LOADING:
      return {
        ...state,
        allUsersLoaded: false,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsersLoaded: true,
        users: action.payload,
      };
    case ALL_USERS_FAILURE:
      return {
        ...state,
        allUsersLoaded: false,
      };
    case VIEWING_USER_SUCCESS:
      return {
        ...state,
        isViewing: action.payload,
        validUser: true,
      };
    case VIEWING_USER_FAILURE:
      return {
        ...state,
        isViewing: null,
        validUser: false,
      };
    default:
      return state;
  }
}
