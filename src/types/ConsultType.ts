import type { Owner } from "./OwnerType";

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
  owner?: Owner;
}
