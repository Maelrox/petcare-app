import Owners from "../components/modules/owner/Owners";
import { fetchAppointmentOptions } from "../hooks/useConsult";
import { fetchPatientOptions, fetchPatients } from "../hooks/usePatient";
import { fetchSpecies } from "../hooks/useSpecie";
import { fetchVeterinaries } from "../hooks/useVeterinary";
import type { Appointment } from "./AppointmentType";
import type { Permission, Role } from "./AuthType";
import type { Consult } from "./ConsultType";
import type { Owner } from "./OwnerType";
import type { Patient } from "./PatientType";
import type { Veterinary } from "./VeterinaryType";

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

export const patientFields: FormField<Patient>[] = [
  {
    name: "patientId",
    identifier: true,
    label: "",
    type: "none",
  },

  {
    name: "owner",
    label: "Owner",
    type: "text",
    required: true,
    searchTable: Owners,
    displaySelect: "name",
    includeFilter: true,
    filterName: "ownerName"
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    validators: { maxLength: 64 },
    includeFilter: true
  },
  {
    name: "breed",
    label: "Breed",
    type: "text",
    required: true,
    includeFilter: true
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    required: true,
  },
  {
    name: "specie",
    label: "Specie",
    type: "select",
    required: true,
    validators: { maxLength: 32 },
    fetch: fetchSpecies,
    dependantId: "id"
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
    type: "text",
    required: true,
    validators: { maxLength: 16 },
  }, {
    name: "notes",
    label: "Notes",
    type: "text",
    required: true,
    validators: { maxLength: 16 },
  }, {
    name: "diagnosis",
    label: "Diagnosis",
    type: "text",
    required: true,
    validators: { maxLength: 16 },
  },

];
