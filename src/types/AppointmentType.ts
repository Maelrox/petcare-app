export interface Appointment {
    patient_id: number;
    vet_id: number;
    appointment_date: string; // ISO date format
    reason: string;
    status: string;
  }
  
 