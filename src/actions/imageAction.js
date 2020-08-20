import axios from 'axios';
import { IMAGE_REGISTER, IMAGE_LOADED, IMAGE_FAIL, IMAGE_LOADING, IMAGE_AUTH } from './types';
import { returnErrors } from '../actions/errorActions';
import { tokenConfig } from '../actions/authActions';

export const loadProfilePics = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: IMAGE_LOADING });

  axios.get(`${process.env.REACT_APP_API}/user/profileImage`, tokenConfig(getState))
    .then(res => dispatch({
      type: IMAGE_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: IMAGE_AUTH
      });
    });
}

export const imageRegister = (formData) => (dispatch) => {

  const config = {
    header: { 'content-type': 'multipart/form-data' }
  }

  // Request body
  // const body = ({ formData });
  console.log(formData)

  axios.post(`${process.env.REACT_APP_API}/profileImage`, formData, config)
    .then(res => dispatch({
      type: IMAGE_REGISTER,
      payload: res.data
    }))
    .catch(err => {
      console.log(err)
      dispatch(returnErrors(err.response.data, err.response.status, 'IMAGE_FAIL'));
      dispatch({
        type: IMAGE_FAIL
      });
    });
}