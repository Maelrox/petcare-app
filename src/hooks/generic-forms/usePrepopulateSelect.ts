import { useEffect } from 'react';
import type { FormField, SelectOption } from "../../types/FormType";

interface UsePrepopulateSelectProps<T, U> {
  fields: FormField<T, U>[];
  initialData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  setSelectedOptions: React.Dispatch<React.SetStateAction<Record<string, SelectOption[]>>>;
  setDropdownOptions: React.Dispatch<React.SetStateAction<Record<string, SelectOption[]>>>;
  handleInputChange?: (name: keyof T, value: any) => void;
}

export const usePrepopulateSelect = <T extends Record<string, any>, U>({
  fields,
  initialData,
  setFormData,
  setSelectedOptions,
  setDropdownOptions,
  handleInputChange
}: UsePrepopulateSelectProps<T, U>) => {
  // Load initial options for all select fields
  useEffect(() => {
    const loadInitialOptions = async () => {
      for (const field of fields) {
        if (field.type === "select") {
          if (field.fetch && typeof field.fetch === "function") {
            const fetchedObjects = await field.fetch();
            if (Array.isArray(fetchedObjects)) {
              const identifierField = field.dependantId;
              const options = fetchedObjects.map((opt: any) => ({
                value: identifierField ? opt[identifierField] : opt[field.name],
                label: String(opt.name),
              }));
              setDropdownOptions((prev) => ({ ...prev, [field.name]: options }));
            } else {
              setDropdownOptions((prev) => ({ ...prev, [field.name]: [] }));
            }
          }
        }
      }
    };

    loadInitialOptions();
  }, [fields]);

  // Prepopulate selected fields
  useEffect(() => {
    const prepopulateSelectFields = async () => {
      for (const field of fields) {
        const fieldNameIndex = field.name.toString();
        
        if (field.type === "select" && initialData[field.name]) {
          if (field.fetch && typeof field.fetch === "function") {
            const fetchedObjects = await field.fetch();
            if (!Array.isArray(fetchedObjects)) {
              console.warn(`No fetched objects returned for field`);
              continue;
            }
            
            const identifierField = field.dependantId as keyof U;
            const initialValue = initialData[field.name];
            const compareValue = typeof initialValue === "object" && initialValue !== null 
              ? initialValue.id 
              : initialValue;

            const selectedOption: any = fetchedObjects.find((opt: any) => {
              return identifierField
                ? opt[identifierField] === compareValue
                : opt[field.name] === compareValue;
            });

            if (selectedOption) {
              const option = {
                value: identifierField ? selectedOption[identifierField] : selectedOption[field.name as keyof U],
                label: String(selectedOption.name),
              };
              
              setSelectedOptions((prev) => ({
                ...prev,
                [field.name]: [...(prev[fieldNameIndex] as SelectOption[] || []), option],
              }));
              
              const formDataValue = typeof initialValue === 'object' && initialValue !== null
                ? { ...initialValue, id: option.value }
                : option.value;
                
              setFormData((prev) => ({ ...prev, [field.name]: formDataValue }));
            }
          }
        }
        else if (field.type === "select-dependant" && initialData[field.name] && field.dependantId) {
          const dependentOn = fields.find((f) => f.name === field.dependsOn);
          const dependantIdIndex = field.dependantId.toString();
          
          if (dependentOn && initialData[dependantIdIndex] && field.fetchDependant && field.dependantId) {
            const options = await field.fetchDependant(
              initialData[dependantIdIndex],
              field.name as string
            );
            
            setDropdownOptions((prev) => ({ ...prev, [field.name]: options }));

            const selectedOption = options.find(
              (opt: any) => opt.value === initialData[field.name]
            );
            
            if (selectedOption) {
              setSelectedOptions((prev) => ({
                ...prev,
                [field.name]: [...(prev[fieldNameIndex] as SelectOption[] || []), selectedOption],
              }));
              
              setFormData((prev) => ({
                ...prev,
                [field.name]: selectedOption.value,
              }));

              if (selectedOption.dependantName && handleInputChange && field.dependsOn) {
                handleInputChange(field.dependsOn, selectedOption.dependantName);
              }
            }
          }
        }
        // 
        else if (field.type === "none" && field.placeHolder && handleInputChange && field.dependsOn) {
          const placeHolder: String = initialData[field.name];
          if (placeHolder) {
            handleInputChange(field.dependsOn, placeHolder);
          }
        }
      }
    };

    prepopulateSelectFields();
  }, [fields, initialData]);
};