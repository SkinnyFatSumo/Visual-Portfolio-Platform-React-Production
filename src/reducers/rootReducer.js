import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import photosReducer from './photosReducer';
import tagsReducer from './tagsReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  photos: photosReducer,
  tags: tagsReducer,
  users: usersReducer,
});

export default rootReducer;
