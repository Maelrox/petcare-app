import { fetchIdentificationTypes } from "../hooks/modules/useManager";
import type { IdentificationType } from "./AuthTypes";
import type { FormField } from "./FormType";

export interface Owner {
  ownerId: number;
  identification?: string;
  identificationType?: IdentificationType;
  name?: string;
  phone?: string;
  address?: string;
}

export const ownerFields: FormField<Owner, IdentificationType>[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true,
    validators: { maxLength: 64 },
    includeFilter: true,
  },
  {
    name: "identification",
    label: "Identification",
    type: "text",
    required: true,
    includeFilter: true,
  },
  {
    name: "identificationType",
    label: "Identification Type",
    type: "select",
    fetch: fetchIdentificationTypes,
    required: true,
    dependantId: "id"
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    required: true,
    validators: { maxLength: 32 },
    includeFilter: true,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    required: true,
    validators: { maxLength: 128 },
  },
];