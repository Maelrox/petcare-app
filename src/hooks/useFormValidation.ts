import { useState } from "react";

interface FormField<T> {
  name: keyof T;
  label: string;
  type: string;
  required?: boolean;
  validators?: Validator;
}

interface Validator {
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  pattern?: RegExp;
  minDate?: Date;
  maxDate?: Date;
  minValue?: number;
}

interface ValidationErrors<T> {
  [key: string]: string | undefined;
}

interface UseFormValidationProps<T> {
  fields: FormField<T>[];
}

export function useFormValidation<T extends Record<string, any>>({
  fields,
}: UseFormValidationProps<T>) {
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  //TODO: Technical debt refactor to avoid so many if
  const validateField = (field: FormField<T>, value: any) => {
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
    const validationErrors: ValidationErrors<T> = {};
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
