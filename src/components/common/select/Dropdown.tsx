import Select from 'react-select';
import type { FormField, SelectOption } from '../../../types/FormType';

interface DropdownProps<T, U, K> {
    dropdownOptions: Record<string, SelectOption[]>;
    selectedOptions: Record<string, SelectOption[]>;
    field: FormField<T, U, K>;
    formData: T;
    handleInputChange: (name: keyof T | undefined, value: any) => void;
}

export function Dropdown<T extends Record<string, any>, U, K>({
    dropdownOptions,
    selectedOptions,
    field,
    formData,
    handleInputChange,
}: DropdownProps<T, U, K>) {

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