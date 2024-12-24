import type { FormField } from "./FormType";

export interface PatientFile {
  fileName: string;
  description: string;
  fileDate?: Date;
  file?: File;
}

export const patientFilesField: FormField<PatientFile, PatientFile, PatientFile>[] = [
  {
    name: "description",
    label: "Description",
    required: true,
    type: "text",
  },
   {
    name: "fileDate",
    label: "Date",
    type: "datetime-local",
    typeFormat: "datetime",
    required: true,
    validators: { maxLength: 100 },
    includeFilter: true
  },
  {
    name: "file",
    label: "File",
    type: "file",
    required: true,
    fileAcceptedTypes: ".pdf,.jpg"
  }, 
];