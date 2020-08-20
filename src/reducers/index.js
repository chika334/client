import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import chatReducer from './chatReducer';
import imageReducer from './imageReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  chat: chatReducer,
  image: imageReducer
})