import Owners from "../components/modules/owner/Owners";
import { fetchAppointmentOptions } from "../hooks/modules/useConsult";
import { fetchPatientOptions } from "../hooks/modules/usePatient";
import { fetchVeterinaries } from "../hooks/modules/useVeterinary";
import type { FormField } from "./FormType";
import type { Owner } from "./OwnerType";
import type { Veterinary } from "./VeterinaryType";

export interface Consult {
  consultationId?: number;
  appointmentId?: number;
  patientId: number;
  vetId: number;
  consultationDate: string;
  reason: string;
  status: string;
  treatment: string;
  notes: string;
  diagnosis: string;
  followUpDate?: string;
  finalDate?: string;
  createdAt?: string;
  updateAt?: string;
  ownerName?: string;
  veterinaryName?: string;
  patientName?: string;
  owner?: Owner;
}

export const consultFields: FormField<Consult, Veterinary>[] = [
  {
    name: "consultationId",
    label: "",
    type: "none",
    required: true,
    includeFilter: false,
    identifier: true,
    displaySelect: "name",
    hiddenOnList: true
  },
  {
    name: "owner",
    label: "Owner",
    type: "text",
    required: true,
    searchTable: Owners,
    placeHolder: true,
    displaySelect: "name",
    hiddenOnList: true
  },
  {
    name: "ownerName",
    label: "Owner",
    type: "none",
    required: false,
    includeFilter: true,
    hiddenOnList: false
  },
  {
    name: "patientId",
    label: "Patient",
    type: "select-dependant",
    required: true,
    dependsOn: "owner",
    validators: { maxLength: 64 },
    dependantId: "ownerId",
    hiddenOnList: true,
    fetchDependant: fetchPatientOptions,
  },
  {
    name: "patientName",
    label: "Patient",
    type: "none",
    required: false,
    includeFilter: true,
    hiddenOnList: false
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
    hiddenOnList: true,
    fetchDependant: fetchAppointmentOptions,
  },
  {
    name: "vetId",
    label: "Veterinary",
    type: "select",
    required: true,
    dependantId: "vetId",
    validators: { maxLength: 64 },
    hiddenOnList: true,
    fetch: fetchVeterinaries,
  }, 
  {
    name: "veterinaryName",
    label: "Veterinary",
    type: "none",
    required: false,
    includeFilter: true,
    hiddenOnList: false,
  },
  {
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
    readOnly: true,
    includeFilter: true,
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
