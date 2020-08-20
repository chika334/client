import { GET_ERRORS, CLEAR_ERRORS, IMAGE_FAIL } from './types';

// RETURN 
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  }
}

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}

export const imageErrors = () => {
  return {
    type: IMAGE_FAIL
  }
}