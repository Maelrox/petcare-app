import React, { useEffect, useState } from "react";
import Button from "../common/buttons/Button";
import Modal from "../common/modals/Modal";
import { addToast } from "../utils/toasterStore";
import { useFormValidation } from "../../hooks/modules/useFormValidation";
import type { FormField } from "../../types/FormType";
import { formatForDateTimeLocal, roundToNearestMinuteInterval } from "../utils/timeUtil";
import { useModalDependantFields } from "../../hooks/generic-forms/useModalFetchDependant";
import { usePrepopulateSelect } from "../../hooks/generic-forms/usePrepopulateSelect";
import { useFormFieldRenderer } from "../../hooks/generic-forms/useRenderField";
interface FormModalProps<T, U, K> {
  initialData: T;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T, optional1?: any, optional2?: any) => Promise<string | undefined>;
  fields: FormField<T, U, K>[];
  title: string;
  description?: string;
  maxSize: string;
}

function FormModal<T extends Record<string, any>, U, K>({
  initialData,
  isOpen,
  onClose,
  onSubmit,
  fields,
  title,
  description,
  maxSize
}: FormModalProps<T, U, K>) {
  const [formData, setFormData] = useState<T>(initialData);
  const [activeSearchModal, setActiveSearchModal] = useState<keyof T | null>(null);
  const { errors, validateField, validateForm, clearFieldError } = useFormValidation<T, U, K>({ fields });

  const {
    dropdownOptions,
    selectedOptions,
    setDropdownOptions,
    setSelectedOptions,
    handleDependentFields,
    handleSearchElementSelect
  } = useModalDependantFields<T, U, K>({
    fields,
    setFormData
  });

  useEffect(() => {
    setFormData(initialData);
    
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      const responseMessage = await onSubmit(formData as T);
      if (responseMessage) {
        addToast(responseMessage);
        onClose();
      }
    }
  };

  const handleInputChange = async (name: keyof T | undefined, value: any) => {
    if (!name) {
      return;
    }
    const field = fields.find((f) => f.name === name);

    // set minutes to multiples of 5
    if (field && field.type === "datetime-local") {
      const selectedDateTime =  roundToNearestMinuteInterval(value)
      value = formatForDateTimeLocal(selectedDateTime)
    }

    // update form data handling objects+id and single values
    setFormData((prev) => {
      const currentValue = prev[name];
      const newValue = currentValue && typeof currentValue === "object" && "id" in currentValue
        ? { ...currentValue, id: value }
        : value;
      return { ...prev, [name]: newValue };
    });

    clearFieldError(name);
    validateForm({ ...formData, [name]: value });
    
    if (field) {
      await handleDependentFields(name, value, field);
    }
  };

  usePrepopulateSelect({
    fields,
    initialData,
    setFormData,
    setSelectedOptions,
    setDropdownOptions,
    handleInputChange
  });

  const handleClickSearch = (fieldName: keyof T) => {
    setActiveSearchModal(fieldName);
  };

  const handleCloseSearch = () => {
    setActiveSearchModal(null);
  };

  const handleSelectElement = async (fieldName: string | number | symbol, selected: any) => {
    await handleSearchElementSelect(fieldName, selected);
    handleCloseSearch();
  };

  const isFormValid = Object.keys(errors).length === 0;
  const identifierField = fields.find(field => field.identifier);
  const isEdit = (identifierField && formData[identifierField.name]) || false;

  const { renderField } = useFormFieldRenderer({
    formData,
    handleInputChange,
    dropdownOptions,
    selectedOptions,
    handleClickSearch,
    isEdit
  });

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose} maxSize={maxSize}>
      {description && <p className="mb-4 text-sm">{description}</p>}
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          field.type != "none" ? (
            <div key={field.name as string} className="mb-4">
              <label
                htmlFor={field.name as string}
                className="block text-sm font-medium text-color_brand mb-1"
              >
                {field.label}
              </label>
              {renderField(field)}
              <span className="text-rose-600">
                {validateField(field, formData[field.name])}
              </span>
            </div>
          ) : null))}
        <Button disabled={!isFormValid} type="submit">
          {isEdit ? "Update" : "Create"}
        </Button>
      </form>
      {/* Allows to search and select data from a table */}
      {activeSearchModal && (
        <Modal
          maxSize="max-w-full min-h-200"
          title={fields.find((f) => f.name === activeSearchModal)?.label || ""}
          isOpen={true}
          onClose={handleCloseSearch}
        >
          {(() => {
            const field = fields.find((f) => f.name === activeSearchModal);
            if (field && field.searchTable) {
              const SearchComponent = field.searchTable;
              return (
                <SearchComponent
                  handleSelect={(selected: any) =>
                    handleSelectElement(field.name, selected)
                  }
                />
              );
            }
            return null;
          })()}
        </Modal>
      )}
    </Modal>
  );
}

export default FormModal;


