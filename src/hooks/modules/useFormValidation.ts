import { useState } from "react";
import type { FormField, ValidationErrors } from "../../types/FormType";

interface UseFormValidationProps<T, U = T, K = T> {
  fields: FormField<T, U, K>[];
}

export function useFormValidation<T extends Record<string, any>, U, K>({
  fields,
}: UseFormValidationProps<T, U, K>) {

  const [errors, setErrors] = useState<ValidationErrors>({});
  const validateField = (field: FormField<T, U, K>, value: any) => {

    if (field.validators) {
      const { required, maxLength, minLength, pattern, minDate, maxDate, minValue } = field.validators;

      if (required && !value) {
        return "This field is required";
      }
      if (maxLength !== undefined && value && value.length > maxLength) {
        return `Maximum length is ${maxLength} characters`;
      }
      if (minLength !== undefined && value && value.length < minLength) {
        return `Minimum length is ${minLength} characters`;
      }
      if (value && pattern && !pattern.test(value)) {
        return "Invalid format";
      }
      if (minDate && value && new Date(value) < minDate) {
        return `Date must be on or after ${minDate.toDateString()}`;
      }
      if (maxDate && value && new Date(value) > maxDate) {
        return `Date must be on or before ${maxDate.toDateString()}`;
      }
      if (minValue && value && value < minValue) {
        return `Value must be greater than ${minValue}`;
      }
    }
    return "";
  };

  const validateForm = (formData: T) => {
    const validationErrors: ValidationErrors = {};
    fields.forEach((field) => {
      const value = formData[field.name];
      const error = validateField(field, value);
      if (error) {
        validationErrors[field.name as string] = error;
      }
    });
    setErrors(validationErrors);
    return validationErrors;
  };

  const clearFieldError = (fieldName: keyof T) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName as string]: undefined }));
  };

  return { errors, validateField, validateForm, clearFieldError };
}
