import type { Owner } from "./OwnerType";

export interface Appointment {
    appointmentId?: number;
    patientId: number;
    vetId: number;
    appointmentDate: string;
    reason: string;
    status: string;
    initialDate?: string;
    finalDate?: string;
    owner?: Owner;
    ownerId?: number;
    specieName?: string;
  }
 
  