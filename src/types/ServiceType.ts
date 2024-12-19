import type { FormField } from "./FormType";

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const serviceFields: FormField<Service>[] = [
  {
    name: "id",
    label: "",
    type: "none",
    identifier: true,
    hiddenOnList: true,
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    validators: { maxLength: 100 },
    includeFilter: true,
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    required: true,
    validators: { maxLength: 100 },
    includeFilter: false,
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    required: true,
    validators: { minValue: 0 },
    includeFilter: false,
  },
];