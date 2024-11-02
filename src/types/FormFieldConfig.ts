import Roles from "../components/modules/management/Roles";
import Owners from "../components/modules/owner/Owners";
import { fetchAppointmentOptions } from "../hooks/useConsult";
import { fetchPatientOptions, fetchPatients } from "../hooks/usePatient";
import { fetchVeterinaries } from "../hooks/useVeterinary";
import type { Appointment } from "./AppointmentType";
import type { Permission, Role } from "./AuthTypes";
import type { Billing } from "./BillingType";
import type { Consult } from "./ConsultType";
import type { Inventory } from "./InventoryType";
import type { Owner } from "./OwnerType";
import type { RegisterRequest } from "./RegisterRequestType";
import type { Veterinary } from "./VeterinaryType";

export type FormFieldType = 
  | "none" 
  | "text" 
  | "number" 
  | "select" 
  | "select-dependant" 
  | "datetime-local" 
  | "text-area";

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

export const appointmentFields: FormField<Appointment>[] = [
  {
    name: "owner",
    label: "Owner",
    type: "text",
    required: true,
    searchTable: Owners,
    placeHolder: true,
    displaySelect: "name",
  },
  {
    name: "patientId",
    label: "Patient",
    type: "select-dependant",
    required: true,
    dependsOn: "owner",
    validators: { maxLength: 64 },
    identifier: true,
    dependantId: "ownerId",
    fetchDependant: fetchPatientOptions,
  },
  {
    name: "vetId",
    label: "Veterinary",
    type: "select",
    required: true,
    dependantId: "vetId",
    validators: { maxLength: 64 },
    fetch: fetchVeterinaries,
  },
  {
    name: "appointmentDate",
    label: "Date",
    type: "datetime-local",
    required: true,
    validators: { maxLength: 64 },
  },
  {
    name: "reason",
    label: "Reason",
    type: "text",
    required: true,
    validators: { maxLength: 256 },
  },
  {
    name: "status",
    label: "Status",
    type: "text",
    required: true,
    validators: { maxLength: 16 },
  },

];

export const consultFields: FormField<Consult>[] = [
  {
    name: "owner",
    label: "Owner",
    type: "text",
    required: true,
    searchTable: Owners,
    placeHolder: true,
    displaySelect: "name",
  },
  {
    name: "patientId",
    label: "Patient",
    type: "select-dependant",
    required: true,
    dependsOn: "owner",
    validators: { maxLength: 64 },
    identifier: true,
    dependantId: "ownerId",
    fetchDependant: fetchPatientOptions,
  },
  {
    name: "appointmentId",
    label: "Appointment",
    type: "select-dependant",
    required: true,
    dependsOn: "patientId",
    validators: { maxLength: 64 },
    identifier: true,
    dependantId: "patientId",
    fetchDependant: fetchAppointmentOptions,
  },
  {
    name: "vetId",
    label: "Veterinary",
    type: "select",
    required: true,
    dependantId: "vetId",
    validators: { maxLength: 64 },
    fetch: fetchVeterinaries,
  }, {
    name: "consultationDate",
    label: "Date",
    type: "datetime-local",
    required: true,
    validators: { maxLength: 64 },
  },
  {
    name: "reason",
    label: "Reason",
    type: "text",
    required: true,
    validators: { maxLength: 256 },
  },
  {
    name: "status",
    label: "Status",
    type: "text",
    required: true,
    validators: { maxLength: 16 },
  }, {
    name: "treatment",
    label: "Treatment",
    type: "text-area",
    required: true,
    validators: { maxLength: 128 },
  }, {
    name: "notes",
    label: "Notes",
    type: "text-area",
    required: true,
    validators: { maxLength: 128 },
  }, {
    name: "diagnosis",
    label: "Diagnosis",
    type: "text-area",
    required: true,
    validators: { maxLength: 256 },
  },

];

export const inventoryFields: FormField<Inventory>[] = [
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

export const billingFields: FormField<Billing>[] = [
  {
    name: "billingId",
    label: "Id",
    type: "none",
    required: true,
    includeFilter: true,
    filterName: "billingId"
  },
  {
    name: "paymentStatus",
    label: "Status",
    type: "none",
    required: true,
    includeFilter: true,
    filterName: "paymentStatus"
  },
  {
    name: "transactionDate",
    label: "Date",
    type: "datetime-local",
    required: true,
    includeFilter: false,
    filterName: "Date"
  },
  {
    name: "identification",
    label: "Identification",
    type: "text",
    required: true,
    displaySelect: "identification",
    includeFilter: true,
    filterName: "identification"
  },
  {
    name: "totalAmount",
    label: "Amount",
    type: "number",
    required: true,
    validators: { minValue: 1 },
  }
];

export const registerFields: FormField<RegisterRequest>[] = [
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
    type: "text",
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
    type: "text",
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