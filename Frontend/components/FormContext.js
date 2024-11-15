import React, { createContext, useState } from 'react';

// Create the form context
export const FormContext = createContext();

// Create a provider component for the form context
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    areaOfInterest: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Define functions to update form data, errors, and submission status
  const updateFormData = (newFormData) => {
    setFormData(newFormData);
  };

  const updateErrors = (newErrors) => {
    setErrors(newErrors);
  };

  const updateSubmitted = (isSubmitted) => {
    setSubmitted(isSubmitted);
  };

  // Create the form context value
  const formContextValue = {
    formData,
    errors,
    submitted,
    updateFormData,
    updateErrors,
    updateSubmitted,
  };

  // Provide the form context value to the children components
  return <FormContext.Provider value={formContextValue}>{children}</FormContext.Provider>;
};
