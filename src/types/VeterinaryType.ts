import { fetchIdentificationTypes } from "../hooks/modules/useManager";
import type { IdentificationType } from "./AuthTypes";
import type { FormField } from "./FormType";

export interface Veterinary {
  vetId: number;
  identification: string;
  identificationType: IdentificationType;
  name: string;
  phone: string;
  specialization: string;
}

export const veterinaryFields: FormField<Veterinary, IdentificationType>[] = [
  {
    name: "vetId",
    identifier: true,
    label: "",
    type: "none",
  },
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
    name: "identificationType",
    label: "Identification Type",
    type: "select",
    required: true,
    fetch: fetchIdentificationTypes,
    dependantId: "id"
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