export interface FormField<T, U = T> {
  name: keyof T;
  label: string;
  type: string;
  required?: boolean;
  validators?: Validator;
  searchTable?: any;
  displaySelect?: string;
  dependsOn?: keyof T;
  dependantId?: string;
  placeHolder?: boolean;
  fetch?: U[] | (() => Promise<U[] | undefined>);
  fetchDependant?: (dependentValue: any, idField: string) => Promise<SelectOption[]>;
  identifier?: boolean;
  includeFilter?: boolean;
  filterName?: string;
  hiddenOnList?: boolean;
  readOnly?: boolean;
}

export interface SelectOption {
  value: number;
  label: string;
  dependantName?: string;
  [key: string]: any;
}

export interface Validator {
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  pattern?: RegExp;
  minDate?: Date;
  maxDate?: Date;
  minValue?: number;
}

export interface ValidationErrors<> {
  [key: string]: string | undefined;
}