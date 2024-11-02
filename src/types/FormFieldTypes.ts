export type FormFieldType = 
  | "none" 
  | "text" 
  | "number" 
  | "select" 
  | "select-dependant" 
  | "datetime-local" 
  | "text-area";

export type FormField<T> = {
  name: keyof T;
  label: string;
  type: FormFieldType;
  required?: boolean;
  identifier?: boolean;
  includeFilter?: boolean;
  filterName?: string;
  validators?: {
    maxLength?: number;
    minValue?: number;
    pattern?: RegExp;
  };
  searchComponent?: React.ComponentType<any>;
  displaySelect?: string;
  placeHolder?: boolean;
  dependsOn?: string;
  dependantId?: string;
  fetch?: () => Promise<any[]>;
  fetchDependant?: (id: number | string) => Promise<any[]>;
  hiddenOnList?: boolean;
};