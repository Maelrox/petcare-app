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

  const validateField = (field: FormField<T>, value: any) => {
    if (field.validators) {
      const { required, maxLength, minLength, pattern, minDate, maxDate } = field.validators;

      if (required && !value) {
        return "This field is required";
      }
      if (maxLength !== undefined && value.length > maxLength) {
        return `Maximum length is ${maxLength} characters`;
      }
      if (minLength !== undefined && value.length < minLength) {
        return `Minimum length is ${minLength} characters`;
      }
      if (pattern && !pattern.test(value)) {
        return "Invalid format";
      }
      if (minDate && new Date(value) < minDate) {
        return `Date must be on or after ${minDate.toDateString()}`;
      }
      if (maxDate && new Date(value) > maxDate) {
        return `Date must be on or before ${maxDate.toDateString()}`;
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
