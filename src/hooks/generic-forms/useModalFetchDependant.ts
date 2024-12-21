import { useState, useCallback } from 'react';
import type { FormField, SelectOption } from '../../types/FormType';

interface UseModalDependantFieldsProps<T, U> {
  fields: FormField<T, U>[];
  setFormData: React.Dispatch<React.SetStateAction<T>>;
}

export function useModalDependantFields<T extends Record<string, any>, U>({
  fields,
  setFormData,
}: UseModalDependantFieldsProps<T, U>) {
  const [dropdownOptions, setDropdownOptions] = useState<Record<string, SelectOption[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, SelectOption[]>>({});
  const [selectedElements, setSelectedElements] = useState<Record<string, any>>({});

  const handleDependentFields = useCallback(async (
    name: keyof T,
    value: any,
    field: FormField<T, U>
  ) => {
    if (field && (field.type === "select" || field.type === "select-dependant")) {
      // Find and set selected option
      const selectedOption = dropdownOptions[name as string]?.find(
        (option) => option.value === value
      );

      setSelectedOptions((prev) => ({
        ...prev,
        [name]: selectedOption ? [selectedOption] : [],
      }));

      // Handle dependent fields
      const dependentFields = fields.filter((f) => f.dependsOn === name);
      for (const dependentField of dependentFields) {
        // Reset dependent field value
        setFormData((prev) => ({
          ...prev,
          [dependentField.name]: undefined
        }));

        // Reset dependent field selections
        setSelectedElements((prev) => ({
          ...prev,
          [dependentField.name]: [],
        }));

        setSelectedOptions((prev) => ({
          ...prev,
          [dependentField.name]: [],
        }));
        console.log(dependentField)

        // Fetch new options if needed
        if (dependentField.fetchDependant && dependentField.dependantId) {
          try {
            const result = await dependentField.fetchDependant(
              value,
              dependentField.name as string
            );

            if (Array.isArray(result)) {
              // Array expected to be SelectOption[]
              setDropdownOptions((prev) => ({
                ...prev,
                [dependentField.name]: result,
              }));
            } else if (result) {
              // Result expected to be a generic type T, U, K
              setFormData((prev) => ({
                ...prev,
                [dependentField.name] : result[dependentField.resultPlaceHolder!],

              }));
              if (dependentField.resultId && typeof dependentField.resultId === "string") {
                setFormData((prev) => ({
                  ...prev,
                  [dependentField.resultId as string]: result[dependentField.resultId!],
                }));
              } else {
                console.warn(`Invalid resultId: ${dependentField.resultId}`);
              }
              
            } else {
              // Result is undefined
              console.warn(`FetchDependant returned undefined for`, dependentField.name);
              setDropdownOptions((prev) => ({
                ...prev,
                [dependentField.name]: [],
              }));
            }
          } catch (error) {
            console.error(`Error fetching dependent option`, error);
          }
        }
      }
    }
  }, [fields, dropdownOptions, setFormData]);

  const handleSearchElementSelect = useCallback(async (
    fieldName: string | number | symbol,
    selected: any
  ) => {
    setSelectedElements((prev) => ({ ...prev, [fieldName]: selected }));

    const field = fields.find((f) => f.name === fieldName);
    if (
      field &&
      field.displaySelect &&
      typeof selected === "object" &&
      selected !== null
    ) {
      const displayValue = selected[field.displaySelect];
      if (displayValue !== undefined) {
        setFormData((prev) => ({
          ...prev,
          [fieldName]: field.placeHolder ? displayValue : selected,
        }));
      }
    }

    // Handle dependent fields after selection
    const dependentFields = fields.filter((f) => f.dependsOn === fieldName);
    for (const dependentField of dependentFields) {
      setFormData((prev) => ({ ...prev, [dependentField.name]: undefined }));

      setSelectedElements((prev) => ({
        ...prev,
        [dependentField.name]: [],
      }));

      setSelectedOptions((prev) => ({
        ...prev,
        [dependentField.name]: [],
      }));

      // Pass dependant Id to fetch function in order to populate the dropdown
      if (dependentField.fetchDependant && dependentField.dependantId) {
        const dependantId = selected[dependentField.dependantId];
        const options = await dependentField.fetchDependant(
          dependantId,
          dependentField.name as string
        );
        setDropdownOptions((prev) => ({
          ...prev,
          [dependentField.name]: options,
        }));
      } else if (dependentField.dependantId && selected && !dependentField.fetch) { // Set dependant id when no additional fetch is required
        const dependantId = selected[dependentField.dependantId];
        setFormData((prev) => ({
          ...prev,
          [dependentField.name]: dependantId
        }));
      }
    }
  }, [fields, setFormData]);

  return {
    dropdownOptions,
    selectedOptions,
    selectedElements,
    setDropdownOptions,
    setSelectedOptions,
    setSelectedElements,
    handleDependentFields,
    handleSearchElementSelect
  };
}