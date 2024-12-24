import { SearchIcon } from "lucide-react";
import type { FormField } from "../../../types/FormType";
import ButtonIcon from "../buttons/ButtonIcon";

interface InputSearchTableProps<T, U, K> {
    field: FormField<T, U, K>;
    formData: T;
    handleInputChange: (name: keyof T | undefined, value: any) => void;
    handleClickSearch: (fieldName: keyof T) => void;
    isEdit: boolean;
}

export function InputSearchTable<T extends Record<string, any>, U, K>({
    field,
    formData,
    handleInputChange,
    handleClickSearch,
    isEdit
}: InputSearchTableProps<T, U, K>) {
    let displayValue = "";
    const fieldValue = formData[field.name];
    if (fieldValue && !Array.isArray(fieldValue) && typeof fieldValue === "object" && "name" in fieldValue) {
        displayValue = fieldValue.name;
    }
    if (fieldValue && !Array.isArray(fieldValue) && typeof fieldValue != "object") {
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
};