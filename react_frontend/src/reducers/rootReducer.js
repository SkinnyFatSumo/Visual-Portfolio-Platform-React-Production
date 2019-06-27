import {combineReducers} from 'redux';
import photosReducer from './photosReducer';
import tagsReducer from './tagsReducer';
import authReducer from './authReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  photos: photosReducer,
  tags: tagsReducer,
  users: usersReducer,
});

export default rootReducer;
