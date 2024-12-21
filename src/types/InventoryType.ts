import type { FormField } from "./FormType";

export interface Inventory {
  inventoryId: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export const inventoryFields: FormField<Inventory, Inventory, Inventory>[] = [
  {
    name: "inventoryId",
    label: "",
    type: "none",
    identifier: true,
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
    name: "quantity",
    label: "Quantity",
    type: "number",
    required: true,
    validators: { minValue: 1 },
    includeFilter: false,
  }, {
    name: "price",
    label: "Price",
    type: "number",
    required: true,
    validators: { minValue: 1 },
    includeFilter: false,
  },
];