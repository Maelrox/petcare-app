import React from 'react';
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { CircleIcon, CheckCircleIcon } from "lucide-react";
import type { SelectOption } from "../../../types/FormType";
import type { Veterinary } from "../../../types/VeterinaryType";

interface AppointmentFiltersProps {
  selectedVet: SelectOption | null;
  selectedOwner: SelectOption | null;
  initialDate: string;
  finalDate: string;
  searchByIdentification: boolean;
  vetOptions: SelectOption[];
  onVetChange: (selectedOption: SelectOption | null) => void;
  onOwnerChange: (selectedOption: SelectOption | null) => void;
  onInitialDateChange: (date: string) => void;
  onFinalDateChange: (date: string) => void;
  onSearchModeChange: () => void;
  loadOwnerOptions: (inputValue: string, callback: (options: SelectOption[]) => void) => void;
}

const AppointmentFilter: React.FC<AppointmentFiltersProps> = ({
  selectedVet,
  selectedOwner,
  initialDate,
  finalDate,
  searchByIdentification,
  vetOptions,
  onVetChange,
  onOwnerChange,
  onInitialDateChange,
  onFinalDateChange,
  onSearchModeChange,
  loadOwnerOptions,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-end">
      <div className="w-full md:col-span-1">
        <label htmlFor="vet-select" className="block text-sm font-medium text-color_brand mb-1">
          Veterinary
        </label>
        <Select
          id="vet-select"
          options={vetOptions}
          value={selectedVet}
          onChange={onVetChange}
          className="w-full"
          classNamePrefix="select"
          isClearable
          placeholder="Select a vet..."
        />
      </div>

      <div className="w-full md:col-span-1">
        <label htmlFor="owner-select" className="block text-sm font-medium text-color_brand mb-1">
          Owner
        </label>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
          <AsyncSelect
            id="owner-select"
            cacheOptions
            loadOptions={loadOwnerOptions}
            value={selectedOwner}
            onChange={onOwnerChange}
            className="w-full md:col-span-1"
            classNamePrefix="select"
            isClearable
            placeholder={`Search by ${searchByIdentification ? 'identification' : 'name'}...`}
            noOptionsMessage={({ inputValue }) =>
              inputValue.length < 3 ? "Please enter at least 3 characters" : "No options"
            }
          />
          <div className="flex items-center mt-2 md:mt-0">
            <label htmlFor="search-mode" className="flex items-center text-sm text-color_brand whitespace-nowrap cursor-pointer">
              <div className="mr-2">
                {searchByIdentification ? (
                  <CheckCircleIcon size={20} className="text-rose-600" />
                ) : (
                  <CircleIcon size={20} className="text-gray-400" />
                )}
              </div>
              By Identification
              <input
                type="checkbox"
                id="search-mode"
                checked={searchByIdentification}
                onChange={onSearchModeChange}
                className="mr-2 appearance-none w-0 h-0 opacity-0"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="w-full md:col-span-1">
        <label htmlFor="initial-date" className="block text-sm font-medium text-color_brand mb-1">
          Initial Date
        </label>
        <input
          id="initial-date"
          type="date"
          className="w-full p-1 text-color_brand border border-gray-300"
          value={initialDate}
          onChange={(e) => onInitialDateChange(e.target.value)}
        />
      </div>
      
      <div className="w-full md:col-span-1">
        <label htmlFor="final-date" className="block text-sm font-medium text-color_brand mb-1">
          Final Date
        </label>
        <input
          id="final-date"
          type="date"
          className="w-full p-1 text-color_brand border border-gray-300"
          value={finalDate}
          onChange={(e) => onFinalDateChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AppointmentFilter;