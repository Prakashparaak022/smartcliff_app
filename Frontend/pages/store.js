import { createStore } from 'redux';

// Define initial state
const initialState = {
  formData: {
    name: '',
    email: '',
    phoneNumber: '',
    areaOfInterest: '',
    message: '',
  },
  errors: {},
  submitted: false,
};

// Define reducer function
const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: action.payload,
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };
    case 'SET_SUBMITTED':
      return {
        ...state,
        submitted: action.payload,
      };
    case 'RESET_FORM':
      return {
        ...state,
        formData: initialState.formData,
        errors: initialState.errors,
        submitted: initialState.submitted,
      };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(formReducer);

export default store;
