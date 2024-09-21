import type { Owner } from "./OwnerType";
import type { Specie } from "./SpecieType";

export interface Patient {
    patientId: number;
    name: string;
    breed: string;
    specie: Specie;
    age: number;
    ownerId: number | null;
    owner?: Owner;
  }