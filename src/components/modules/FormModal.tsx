  import React, { useEffect, useState } from "react";
  import Button from "../common/buttons/Button";
  import Modal from "../common/modals/Modal";
  import { addToast } from "../utils/toasterStore";
  import { useFormValidation } from "../../hooks/useFormValidation";

  interface FormModalProps<T> {
    initialData: T;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: T) => Promise<string | undefined>;
    fields: FormField<T>[];
    title: string;
    description: string;
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
    const { errors, validateField, validateForm, clearFieldError } = useFormValidation<T>({ fields });

    useEffect(() => {
      setFormData(initialData);
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length === 0) {
        const responseMessage = await onSubmit(formData);
        if (responseMessage) {
          addToast(responseMessage);
          onClose();
        }
      }
    };

    const handleInputChange = (name: keyof T, value: any) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      clearFieldError(name);
      validateForm({ ...formData, [name]: value }); 
    };

    const isFormValid = Object.keys(errors).length === 0;

    return (
      <Modal title={title} isOpen={isOpen} onClose={onClose}>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4 text-sm">{description}</p>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name as string} className="mb-4">
              <label
                htmlFor={field.name as string}
                className="block text-sm font-medium text-color_brand mb-1"
              >
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name as string}
                value={formData[field.name]}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                required={field.required}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <span className="text-rose-600">{validateField(field, formData[field.name])}</span>
            </div>
          ))}
          <Button disabled={!isFormValid} type="submit">{initialData.id ? "Update" : "Create"}</Button>
        </form>
      </Modal>
    );
  }

  export default FormModal;