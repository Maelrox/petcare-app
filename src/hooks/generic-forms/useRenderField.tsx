import type { FormField, SelectOption } from '../../types/FormType';
import { FileUpload } from '../../components/common/input/FileUpload';
import { Dropdown } from '../../components/common/select/DropDown';
import { InputSearchTable } from '../../components/common/input/InputSearchTable';

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

  //Returns a form component according to the field configuration
  const renderField = (field: FormField<T, U, K>) => {
    if (field.type === "none") {
      return null;
    }

    if (field.type === "select" || field.type === "select-dependant") {
      return (
      <Dropdown
        dropdownOptions={dropdownOptions}
        selectedOptions={selectedOptions}
        field={field}
        formData={formData}
        handleInputChange={handleInputChange} />
      );
    }

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

    if (field.type === "file" && field.fileAcceptedTypes) {
      return (
        <FileUpload
          field={field}
          formData={formData}
          handleInputChange={handleInputChange}
          isEdit={false} />
      )
    }

    if (field.searchTable) {
      return (
        <InputSearchTable
          field={field}
          formData={formData}
          handleInputChange={handleInputChange}
          handleClickSearch={handleClickSearch}
          isEdit={isEdit} />
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
  }

  return { renderField };

}