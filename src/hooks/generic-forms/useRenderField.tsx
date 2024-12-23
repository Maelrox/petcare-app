import Select from 'react-select';
import { SearchIcon } from 'lucide-react';
import type { FormField, SelectOption } from '../../types/FormType';
import ButtonIcon from '../../components/common/buttons/ButtonIcon';
import type { ReactNode } from 'react';

interface UseFormFieldRendererProps<T, U, K> {
  formData: T;
  handleInputChange: (name: keyof T | undefined, value: any) => void;
  dropdownOptions: Record<string, SelectOption[]>;
  selectedOptions: Record<string, SelectOption[]>;
  handleClickSearch: (fieldName: keyof T) => void;
  isEdit: boolean;
}

export function useFormFieldRenderer<T extends Record<string, any>, U, K>({
  formData,
  handleInputChange,
  dropdownOptions,
  selectedOptions,
  handleClickSearch,
  isEdit,
}: UseFormFieldRendererProps<T, U, K>) {

  //Returns a form component depending of the FormField configuration of the generic
  const renderField = (field: FormField<T, U, K>) => {
    if (field.type === "none") {
      return null;
    }

    // Selects
    if (field.type === "select-dependant" || field.type === "select") {
      const fieldNameIndex = field.name.toString();
      const options = dropdownOptions[fieldNameIndex] || [];
      const isDisabled = field.dependsOn && !formData[field.dependsOn];
      const value = selectedOptions[fieldNameIndex] || null;

      return (
        <Select
          options={options}
          value={value}
          onChange={(selected) => handleInputChange(field.name, selected?.value)}
          isDisabled={isDisabled}
          isClearable={false}
          placeholder="Select..."
        />
      );
    }

    // Textareas
    if (field.type === "text-area") {
      return (
        <textarea
          id={field.name as string}
          value={formData[field.name] || ""}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
          required={field.required}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      );
    }

    // Custom
    if (field.type === "custom" && field.customType) {
      const CustomComponent = field.customType;

      return (
        <CustomComponent
          value={formData[field.name]}
          onChange={(value: any) => handleInputChange(field.name, value)}
          error={[]}
          required={field.required}
          {...field}>
        </CustomComponent>
      );
    }


    // Get the display value from the selected/retrieved object/array
    if (field.searchTable) {
      let displayValue = "";
      const fieldValue = formData[field.name];
      if (fieldValue && !Array.isArray(fieldValue) && typeof fieldValue === "object" && "name" in fieldValue) {
        displayValue = fieldValue.name;
      }
      if (fieldValue && !Array.isArray(fieldValue)) {
        displayValue = fieldValue;
      }
      // Handle employees roles array in edition prepulatefields
      if (fieldValue && Array.isArray(fieldValue) && fieldValue.length > 0 && "name" in fieldValue[0] && isEdit) {
        displayValue = fieldValue[0].name;
      }
      return (
        <div className="flex items-center">
          <input
            type="text"
            id={field.name as string}
            value={displayValue}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            disabled
          />
          <ButtonIcon
            type="button"
            bgColor="bg-gray-300"
            onClick={() => handleClickSearch(field.name)}
          >
            <SearchIcon
              className="text-color_brand hover:animate-pulse"
              size={24}
            />
          </ButtonIcon>
        </div>
      );
    }

    // Input Fields
    return (
      <input
        type={field.type}
        id={field.name as string}
        value={formData[field.name] || ""}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
        required={field.required && field.type != "password" && isEdit}
        readOnly={field.readOnly}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
      />
    );
  };

  return { renderField };
}