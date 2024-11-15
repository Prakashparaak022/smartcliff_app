export const setFormData = (formData) => ({
    type: 'SET_FORM_DATA',
    payload: formData,
  });
  
  export const setErrors = (errors) => ({
    type: 'SET_ERRORS',
    payload: errors,
  });
  
  export const setSubmitted = (submitted) => ({
    type: 'SET_SUBMITTED',
    payload: submitted,
  });
  
  export const resetForm = () => ({
    type: 'RESET_FORM',
  });
  