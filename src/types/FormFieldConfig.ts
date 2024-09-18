import Owners from "../components/modules/owner/Owners";
import { fetchPatientOptions } from "../hooks/usePatient";
import { fetchVeterinaries } from "../hooks/useVeterinary";
import type { Appointment } from "./AppointmentType";
import type { Permission, Role } from "./AuthType";
import type { Owner } from "./OwnerType";
import type { Patient } from "./PatientType";
import type { Veterinary } from "./VeterinaryType";

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

export const veterinaryFields: FormField<Veterinary>[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true,
    validators: { maxLength: 64 },
  },
  {
    name: "identification",
    label: "Identification",
    type: "text",
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
  },
  {
    name: "identification",
    label: "Identification",
    type: "text",
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
    name: "address",
    label: "Address",
    type: "text",
    required: true,
    validators: { maxLength: 128 },
  },
];

export const patientFields: FormField<Patient>[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true,
    validators: { maxLength: 64 },
  },
  {
    name: "breed",
    label: "Breed",
    type: "text",
    required: true,
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    required: true,
  },
  {
    name: "species",
    label: "Specie",
    type: "text",
    required: true,
    validators: { maxLength: 32 },
  },
  {
    name: "owner",
    label: "Owner",
    type: "select",
    required: true,
    searchTable: Owners,
    displaySelect: "name",
  },
];


export const appointmentFields: FormField<Appointment>[] = [
  {
    name: "owner",
    label: "Owner",
    type: "text",
    required: true,
    searchTable: Owners,
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

