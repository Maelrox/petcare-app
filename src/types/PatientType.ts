import Owners from "../components/modules/owner/Owners";
import { fetchSpecies } from "../hooks/modules/useSpecie";
import type { FormField } from "./FormType";
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

export const patientFields: FormField<Patient, Specie>[] = [
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
    name: "specie",
    label: "Specie",
    type: "select",
    required: true,
    validators: { maxLength: 32 },
    fetch: fetchSpecies,
    dependantId: "id"
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

];