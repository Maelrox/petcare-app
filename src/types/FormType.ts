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