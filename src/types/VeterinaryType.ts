import type { FormField } from "./FormType";

export interface Veterinary {
  vetId: number;
  identification: string;
  identificationTypeId: number;
  name: string;
  phone: string;
  specialization: string;
}

export const veterinaryFields: FormField<Veterinary>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    includeFilter: true,
    validators: { maxLength: 64 },
  },
  {
    name: "identification",
    label: "Identification",
    type: "text",
    includeFilter: true,
    required: true,
  },
  {
    name: "identificationTypeId",
    label: "Identification Type",
    type: "number",
    required: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    required: true,
    validators: { maxLength: 32 },
  },
  {
    name: "specialization",
    label: "Specialization",
    type: "text",
    required: true,
    validators: { maxLength: 32 },
  },
];