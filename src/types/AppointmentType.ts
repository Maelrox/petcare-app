export interface Appointment {
    id?: number;
    patientId: number;
    vetId: number;
    appointmentDate: string;
    reason: string;
    status: string;
    initialDate?: string;
    finalDate?: string;
  }
 
  