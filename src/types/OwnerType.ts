export interface Owner {
  ownerId: number;
  identification?: string;
  identificationTypeId?: number;
  name?: string;
  phone?: string;
  address?: string;
}

export const ownerFields: FormField<Owner>[] = [
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