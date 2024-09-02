import type { Permission, Role } from "./AuthType";

export const roleFields: FormField<Role>[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    validators: { maxLength: 50 },
  }
];

export const permissionFields: FormField<Permission>[] = [
  {
    name: "name",
    label: "Permission Name",
    type: "text",
    required: true,
    validators: { maxLength: 64 },
  }
];