import type { FormField } from "./FormType";

export interface Module {
  id: number;
  name: string;
  modulesActions: ModuleAction[]
}

export interface ModuleAction {
  selected?: boolean;
  id: number;
  name: string;
}

export interface Permission {
  id?: number;
  name: string;
  modulesAction?: ModuleAction[];
}

export const permissionFields: FormField<Permission>[] = [
  {
    name: "id",
    label: "",
    type: "none",
    identifier: true,
    includeFilter: false,
  },
  {
    name: "name",
    label: "Permission Name",
    type: "text",
    required: true,
    validators: { maxLength: 64 },
    includeFilter: true,
  }
];


export interface PermissionModules extends Permission {
  id?: number;
  name: string;
  moduleId: string;
  modulesAction?: ModuleAction[];
}

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
  country: string;
  enabled: boolean;
  companyId: number;
  actions: Action[];
}

export interface Action {
  id: number;
  name: string;
  module: Module;
}

export interface Module {
  id: number;
  name: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  expirationDate: string;
  userDetails: UserDetails;
}

export type LoginRequest = {
  userName: string;
  password: string;
  token: string;
};

export interface Role {
  id?: number;
  name: string;
  permissions?: Permission[];
}

export const roleFields: FormField<Role>[] = [
  {
    name: "id",
    label: "",
    type: "none",
    identifier: true,
    includeFilter: false,
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    validators: { maxLength: 50 },
    includeFilter: true,
  }
];

export interface IdentificationType {
  id: number;
  name: string;
}