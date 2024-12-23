import CountrySelect from "../components/common/select/CountrySelect";
import Roles from "../components/modules/management/Roles";
import type { FormField } from "./FormType";

export interface RegisterRequest {
  id?: number;
  username: string;
  name: string;
  password: string;
  email: string;
  phone: string;
  country: string;
  roles: string[];
  token: string;
  company?: Company;
}

export interface Company {
  name: string,
  companyIdentification: string,
  country: string
}

export const registerFields: FormField<RegisterRequest , RegisterRequest, RegisterRequest>[] = [
  {
    name: "id",
    identifier: true,
    label: "",
    hiddenOnList: true,
    type: "none",
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    validators: { maxLength: 256 },
  },
  {
    name: "username",
    label: "User Name",
    type: "text",
    required: true,
    placeHolder: true,
    includeFilter: true,
    validators: { maxLength: 256 },
    displaySelect: "name",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    hiddenOnList: true,
    validators: { maxLength: 32 },
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    required: true,
    includeFilter: true,
    validators: { maxLength: 256 },
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    required: true,
    validators:
    {
      pattern: /^\d{3}-\d{3}-\d{4}$/
    },
  },
  {
    name: "country",
    label: "Country",
    type: "custom",
    customType: CountrySelect,
    required: true,
    validators: { maxLength: 2 },
  },
  {
    name: "roles",
    label: "Rol",
    type: "text",
    required: true,
    placeHolder: true,
    displaySelect: "name",
    hiddenOnList: true,
    searchTable: Roles,
  }

];