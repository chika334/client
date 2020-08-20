import axios from 'axios';
import { returnErrors } from './errorActions'

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from '../actions/types';

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loadicess.env.ng
  dispatch({ type: USER_LOADING });

  axios.get(`${process.env.REACT_APP_API}/users/auth`, tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: AUTH_ERROR
      });
    });
}

// Register User
export const register = ({ firstname, lastname, email, password, department, file }) => dispatch => {
  // Headers
  const config = {
    headers: {
      // 'Accept': 'multipart/form-data',
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ firstname, lastname, email, password, department });
  console.log(body)

  axios.post(`${process.env.REACT_APP_API}/users`, body, config)
    .then(res => dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL
      });
    });
}

// Login Users
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ email, password });

  axios.post(`${process.env.REACT_APP_API}/login`, body, config)
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: LOGIN_FAIL
      });
    });
}

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

// setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localStorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }

  // if token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
}