import React, { useEffect, useState } from "react";
import Button from "../common/buttons/Button";
import Modal from "../common/modals/Modal";
import { addToast } from "../utils/toasterStore";
import { useFormValidation } from "../../hooks/useFormValidation";
import { SearchIcon } from "lucide-react";
import ButtonIcon from "../common/buttons/ButtonIcon";
import Select from "react-select";
import type { FormField, SelectOption } from "../../types/FormType";

interface FormModalProps<T, U> {
  initialData: T;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => Promise<string | undefined>;
  fields: FormField<T, U>[];
  title: string;
  description?: string;
  maxSize: string;
}

function FormModal<T extends Record<string, any>, U>({
  initialData,
  isOpen,
  onClose,
  onSubmit,
  fields,
  title,
  description,
  maxSize
}: FormModalProps<T, U>) {
  const [formData, setFormData] = useState<T>(initialData);
  const [activeSearchModal, setActiveSearchModal] = useState<keyof T | null>(null);
  const [selectedElements, setSelectedElements] = useState<Record<string, any>>({});
  const [dropdownOptions, setDropdownOptions] = useState<Record<string, SelectOption[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, SelectOption[]>>({});
  const { errors, validateField, validateForm, clearFieldError } = useFormValidation<T, U>({ fields });

  useEffect(() => {
    setFormData(initialData);
    prepopulateSelectFields();
  }, [initialData]);

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
    setFormData((prev) => {
      const currentValue = prev[name];
      const newValue =
        currentValue && typeof currentValue === "object" && "id" in currentValue
          ? { ...currentValue, id: value }
          : value;
      return { ...prev, [name]: newValue };
    });

    clearFieldError(name);
    validateForm({ ...formData, [name]: value });
    const field = fields.find((f) => f.name === name);
    if (
      field &&
      (field.type === "select" || field.type === "select-dependant")
    ) {
      const selectedOption = dropdownOptions[name as keyof typeof dropdownOptions]?.find(
        (option) => option.value === value
      );
      setSelectedOptions((prev) => ({
        ...prev,
        [name]: selectedOption ? [selectedOption] : [],
      }));
      const dependentFields = fields.filter((f) => f.dependsOn === name);
      for (const dependentField of dependentFields) {
        setFormData((prev) => ({ ...prev, [dependentField.name]: undefined }));
        setSelectedOptions((prev) => ({
          ...prev,
          [name]: selectedOption ? [selectedOption] : [],
        }));
        if (dependentField.fetchDependant && dependentField.dependantId) {
          const options = await dependentField.fetchDependant(
            value,
            dependentField.name as string
          );
          setDropdownOptions((prev) => ({
            ...prev,
            [dependentField.name]: options,
          }));
        }
      }
    }
  };

  const handleClickSearch = (fieldName: keyof T) => {
    setActiveSearchModal(fieldName);
  };

  const handleCloseSearch = () => {
    setActiveSearchModal(null);
  };

  const handleSelectElement = async (fieldName: string | number | symbol, selected: any) => {
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

    // After selection - fetch the next dependant select 
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
      }
    }

    handleCloseSearch();
  };

  //Populate selects when editing a row
  const prepopulateSelectFields = async () => {
    for (const field of fields) {
      const fieldNameIndex = field.name.toString()
      if (field.type === "select" && initialData[field.name]) {
        if (field.fetch && typeof field.fetch === "function") {
          const fetchedObjects = await field.fetch();
          if (!Array.isArray(fetchedObjects)) {
            console.warn(`No fetched objects returned for field`);
            continue;
          }
          const identifierField = field.dependantId as keyof U;
          const initialValue = initialData[field.name];
          const compareValue = typeof initialValue === "object" && initialValue !== null ? initialValue.id : initialValue;

          // Find the selected option based on the identifierField
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
            // Update selected options with an array containing the new option
            setSelectedOptions((prev) => ({
              ...prev,
              [field.name]: [...(prev[fieldNameIndex] as SelectOption[] || []), option], // Use type assertion here
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
            if (selectedOption.dependantName) {
              handleInputChange(field.dependsOn, selectedOption.dependantName);
            }
          }
        }
      }
    }
  };

  const renderField = (field: FormField<T, U>) => {
    if (field.type === "none") {
      return;
    }
    if (field.type === "select-dependant" || field.type === "select") {
      const fieldNameIndex = field.name.toString();
      const options = dropdownOptions[fieldNameIndex] || [];
      const isDisabled = field.dependsOn && !formData[field.dependsOn];
      const value = selectedOptions[fieldNameIndex] || null;
      return (
        <Select
          options={options}
          value={value}
          onChange={(selected) =>
            handleInputChange(field.name, selected?.value)
          }
          isDisabled={isDisabled}
          isClearable={false}
          placeholder="Select..."
        />
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

  const isFormValid = Object.keys(errors).length === 0;

  const identifierField = fields.find(field => field.identifier);

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
          {identifierField && formData[identifierField.name] ? "Update" : "Create"}
        </Button>
      </form>
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
