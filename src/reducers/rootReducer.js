import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import messagesReducer from './messagesReducer';
import photosReducer from './photosReducer';
import tagsReducer from './tagsReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  messages: messagesReducer,
  photos: photosReducer,
  tags: tagsReducer,
  users: usersReducer,
});

export default rootReducer;
