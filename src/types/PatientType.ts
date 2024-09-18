import type { Owner } from "./OwnerType";

export interface Patient {
    patientId: number;
    name: string;
    breed: string;
    species: string;
    age: number;
    ownerId: number | null;
    owner?: Owner;
  }