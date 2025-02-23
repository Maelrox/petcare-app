export interface FormField<T, U, K> {
  name: keyof T;
  label: string;
  type: string;
  typeFormat?: string;
  required?: boolean;
  validators?: Validator;
  searchTable?: any;
  displaySelect?: string;
  dependsOn?: keyof T;
  dependantId?: string;
  placeHolder?: boolean;
  fetch?: U[] | (() => Promise<U[] | undefined>);
  identifier?: boolean;
  includeFilter?: boolean;
  filterName?: string;
  hiddenOnList?: boolean;
  readOnly?: boolean;
  resultPlaceHolder?: string;
  resultId?: string;
  fetchDependant?: (dependentValue: any, idField: string) => Promise<SelectOption[]> | Promise<K | undefined>;
  fetchEditDependant?: (dependentValue: any, idField: string, idType: string) => Promise<SelectOption[]> | Promise<K | undefined>;
  customType?: React.FC<any>
  fileAcceptedTypes?: string
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