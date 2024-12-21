import Select from 'react-select';
import { SearchIcon } from 'lucide-react';
import type { FormField, SelectOption } from '../../types/FormType';
import ButtonIcon from '../../components/common/buttons/ButtonIcon';

interface UseFormFieldRendererProps<T, U, K> {
  formData: T;
  handleInputChange: (name: keyof T | undefined, value: any) => void;
  dropdownOptions: Record<string, SelectOption[]>;
  selectedOptions: Record<string, SelectOption[]>;
  handleClickSearch: (fieldName: keyof T) => void;
}

export function useFormFieldRenderer<T extends Record<string, any>, U, K>({
  formData,
  handleInputChange,
  dropdownOptions,
  selectedOptions,
  handleClickSearch,
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

    // Search Table Result PlaceHolder (display value from the selected object)
    if (field.searchTable) {
      const fieldValue = formData[field.name];
      const displayValue =
        fieldValue && typeof fieldValue === "object" && "name" in fieldValue
          ? fieldValue.name
          : fieldValue || "";

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
        required={field.required}
        readOnly={field.readOnly}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
      />
    );
  };

  return { renderField };
}