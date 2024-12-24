import type { FormField } from "./FormType";
import type { Patient } from "./PatientType";

export interface PatientFile {
  fileId?: number;
  fileName: string;
  description: string;
  fileDate?: Date;
  file?: File;
  filePath?: string;
  patient?: Patient;
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