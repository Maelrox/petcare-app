import React, { useState } from "react";
import ButtonIcon from "../buttons/ButtonIcon";
import { TextSearch } from "lucide-react";
import { camelCaseToCapitalizedWithSpace } from "../../utils/stringUtils";

interface FilterControlsProps {
  addFilter: (column: string, value: string) => void;
  availableFilters: string[];
  removeFilter: (filter: string) => void;
  filters: Record<string, string>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  availableFilters,
  addFilter,
  removeFilter,
  filters,
  setRefresh,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const handleAddFilter = () => {
    addFilter(selectedFilter, value);
    setRefresh(true);
  };

  return (
    <>
      <div className="flex flex-wrap items-center p-0 lg:pl-4">
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border p-2 rounded text-skyblue_dark w-full md:max-w-48 mt-4 ml-2 mr-2 md:mt-0 md:ml-0 md:mr-4"
        >
          <option value="">Select filter</option>
          {availableFilters.map((filter) => (
            <option key={filter} value={filter}>
              {camelCaseToCapitalizedWithSpace(filter)}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Filter value..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border p-2 rounded focus:border-orange focus:ring-0 w-full md:max-w-48 mt-4 ml-2 mr-2 md:mt-0 md:ml-0 md:mr-0"
        />
        <div className="mt-4 md:mt-0 align-baseline">
          <ButtonIcon text="Add Filter" onClick={handleAddFilter}>
            <TextSearch />
          </ButtonIcon>
        </div>
      </div>
      <div className="flex mt-2 ml-2 flex-wrap ">
        {Object.entries(filters).map(([key, value]) => (
          <span
            key={key}
            className="mr-2 p-2 bg-rose-600 text-white shadow-lg flex items-center mb-2 md:mb-0 mt-0 md:mt-0 ml-2"
          >
            <span className="font-semibold">
              {key}: {value}
            </span>
            <button
              onClick={() => removeFilter(key)}
              className="ml-2 text-white rounded-full w-5 h-5 flex items-center justify-center"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </>
  );
};

export default FilterControls;
