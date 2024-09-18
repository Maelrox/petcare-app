import React, { useEffect, useState } from "react";
import Button from "../common/buttons/Button";
import Modal from "../common/modals/Modal";
import { addToast } from "../utils/toasterStore";
import { useFormValidation } from "../../hooks/useFormValidation";
import { SearchIcon } from "lucide-react";
import ButtonIcon from "../common/buttons/ButtonIcon";
import Select from "react-select";


interface FormModalProps<T> {
  initialData: T;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => Promise<string | undefined>;
  fields: FormField<T>[];
  title: string;
  description?: string;
}

function FormModal<T extends Record<string, any>>({
  initialData,
  isOpen,
  onClose,
  onSubmit,
  fields,
  title,
  description,
}: FormModalProps<T>) {
  const [formData, setFormData] = useState<T>(initialData);
  const [activeSearchModal, setActiveSearchModal] = useState<keyof T | null>(null);
  const [selectedElements, setSelectedElements] = useState<Record<string, any>>({});
  const [dropdownOptions, setDropdownOptions] = useState<Record<string, SelectOption[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, SelectOption[]>>({});

  const { errors, validateField, validateForm, clearFieldError } = useFormValidation<T>({ fields });

  const submissionData = {
    ...formData,
    ...selectedElements,
    ...selectedOptions,
  };

  useEffect(() => {
    setFormData(initialData);
    prepopulateSelectFields();
  }, [initialData]);

  useEffect(() => {
    const loadInitialOptions = async () => {
      for (const field of fields) {
        if (field.type === 'select') {
          if (field.fetch && typeof field.fetch === 'function') {
            const fetchedObjects = await field.fetch();
            const identifierField = field.dependantId;
            const options = fetchedObjects.map((opt: any) => ({
              value: identifierField ? opt[identifierField] : opt[field.name],
              label: String(opt.name),
            }));
            setDropdownOptions(prev => ({ ...prev, [field.name]: options }));
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

  const handleInputChange = async (name: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name);
    validateForm({ ...formData, [name]: value });
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickSearch = (fieldName: keyof T) => {
    setActiveSearchModal(fieldName);
  };

  const handleCloseSearch = () => {
    setActiveSearchModal(null);
  };

  const handleSelectElement = async (fieldName: string, selected: any) => {
    setSelectedElements((prev) => ({ ...prev, [fieldName]: selected }));
    const field = fields.find((f) => f.name === fieldName);

    if (field && field.displaySelect && typeof selected === 'object' && selected !== null) {
      const displayValue = selected[field.displaySelect];
      if (displayValue !== undefined) {
        setFormData((prev) => ({
          ...prev,
          [fieldName]: displayValue,
        }));
      }
    }

    // Call the dependant function
    const dependentFields = fields.filter(f => f.dependsOn === fieldName);
    for (const dependentField of dependentFields) {
      setFormData(prev => ({ ...prev, [dependentField.name]: undefined }));
      setSelectedElements(prev => ({ ...prev, [dependentField.name]: undefined }));
      setSelectedOptions(prev => ({ ...prev, [dependentField.name]: undefined }));
      if (dependentField.fetchDependant && dependentField.dependantId) {
        const dependantId = selected[dependentField.dependantId];
        const options = await dependentField.fetchDependant(dependantId, dependentField.name as string);
        setDropdownOptions(prev => ({ ...prev, [dependentField.name]: options }));
      }
    }

    handleCloseSearch();
  };

  
  const prepopulateSelectFields = async () => {
    for (const field of fields) {
      if (field.type === 'select' && initialData[field.name]) {
        if (field.fetch && typeof field.fetch === 'function') {
          const fetchedObjects = await field.fetch();
          const identifierField = field.dependantId;
          const selectedOption = fetchedObjects.find((opt: any) => 
            identifierField ? opt[identifierField] === initialData[field.name] : opt[field.name] === initialData[field.name]
          );
          
          if (selectedOption) {
            const option = {
              value: identifierField ? selectedOption[identifierField] : selectedOption[field.name],
              label: String(selectedOption.name),
            };
            setSelectedOptions(prev => ({ ...prev, [field.name]: option }));
            setFormData(prev => ({ ...prev, [field.name]: option.value }));
          }
        }
      } else if (field.type === 'select-dependant' && initialData[field.name] && field.dependantId) {
        const dependentOn = fields.find(f => f.name === field.dependsOn);
        if (dependentOn && initialData[field.dependantId] && field.fetchDependant && field.dependantId) {
          const options = await field.fetchDependant(initialData[field.dependantId], field.name as string);
          setDropdownOptions(prev => ({ ...prev, [field.name]: options }));
          
          const selectedOption = options.find((opt: any) => opt.value === initialData[field.name]);
          if (selectedOption) {
            setSelectedOptions(prev => ({ ...prev, [field.name]: selectedOption }));
            setFormData(prev => ({ ...prev, [field.name]: selectedOption.value }));
            handleInputChange(field.dependsOn, selectedOption.dependantName)
          }
        }
      }
    }
  };

  const renderField = (field: FormField<T>) => {
    if (field.type === 'select-dependant' || field.type === 'select') {
      const options = dropdownOptions[field.name] || [];
      const isDisabled = field.dependsOn && !formData[field.dependsOn];
      const value = selectedOptions[field.name] || null;
      console.log(value)
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

    if (field.searchTable) {
      return (
        <div className="flex items-center">
          <input
            type="text"
            id={field.name as string}
            value={formData[field.name] || ''}
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
            <SearchIcon className="text-color_brand hover:animate-pulse" size={24} />
          </ButtonIcon>
        </div>
      );
    }

    return (
      <input
        type={field.type}
        id={field.name as string}
        value={formData[field.name] || ''}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
        required={field.required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
      />
    );
  };

  const isFormValid = Object.keys(errors).length === 0;

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      {description && <p className="mb-4 text-sm">{description}</p>}
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
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
        ))}
        <Button disabled={!isFormValid} type="submit">
          {initialData.id ? "Update" : "Create"}
        </Button>
      </form>
      {activeSearchModal && (
        <Modal
          maxSize="max-w-full min-h-200"
          title={fields.find((f) => f.name === activeSearchModal)?.label || ''}
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