import {
  IMAGE_FAIL,
  IMAGE_REGISTER,
  IMAGE_LOADING,
  IMAGE_LOADED
} from '../actions/types';

const initialState = {
  // token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  // images: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case IMAGE_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case IMAGE_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        // images: action.payload
      };
    case IMAGE_REGISTER:
      // localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        // images: action.payload
      };
    case IMAGE_FAIL:
      // localStorage.removeItem('token');
      return {
        ...state,
        // token: null,
        images: null,
        isAuthenticated: false,
        isLoading: false
      }
    default:
      return state;
  }
}