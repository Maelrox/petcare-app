import { useState, useEffect } from "react";
import DataTable from "../../common/tables/Table";
import usePaginatedData from "../../../hooks/usePaginatedData";
import ButtonIcon from "../../common/buttons/ButtonIcon";
import FilterControls from "../../common/tables/TableFilterControls";
import FormModal from "../FormModal";
import { PlusSquareIcon } from "lucide-react";
import type { Patient } from "../../../types/PatientType";
import { createPatient, searchPatients, updatePatient } from "../../../hooks/usePatient";
import { patientFields } from "../../../types/FormFieldConfig";

function Patients() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const paginatedData = usePaginatedData(searchPatients);

  useEffect(() => {
    setRefresh(true);
  }, []);

  const {
    data,
    filters,
    availableFilters,
    pagination,
    addFilter,
    removeFilter,
    handlePaginationChange,
    totalRows,
    setRefresh,
    isLoading,
  } = paginatedData;

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleDelete = async (patient: Patient) => {
    if (patient.patientId) {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete the patient "${patient.name}"?`
      );
      if (isConfirmed) {
        const responseMessage = "TODO"; //await deleteOwner(owner.vetId);
        if (responseMessage) {
          setRefresh(true);
        }
        return responseMessage;
      }
    }
  };

  const handleAddClick = () => {
    setSelectedPatient(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const handleSubmit = async (data: Patient) => {
    const responseMessage = data.patientId
      ? await updatePatient(data)
      : await createPatient(data);
    if (responseMessage) {
      setRefresh(true);
    }
    return responseMessage;
  };

  return (
    <>
      <h2 className="text-center text-color_brand font-bold">Patients</h2>
      <div className="flex flex-col p-0 items-center md:flex-row md:justify-between mb-0">
        <div className="w-full lg:w-2/3 md:pr-2 md:mb-0">
          <FilterControls
            setRefresh={setRefresh}
            addFilter={addFilter}
            removeFilter={removeFilter}
            availableFilters={availableFilters.current}
            filters={filters}
          />
        </div>
        <div className="w-full md:w-1/3 flex lg:justify-end max-h-16">
          <ButtonIcon
            type="submit"
            text="New Patient"
            onClick={() => handleAddClick()}
          >
            <PlusSquareIcon />
          </ButtonIcon>
        </div>
      </div>
      <div>
        <DataTable
          dataSource={data}
          pagination={pagination}
          totalRows={totalRows.current}
          onPaginationChange={handlePaginationChange}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isLoading={isLoading}
          configFields={patientFields}
        />
      </div>
      {isModalOpen && (
        <FormModal<Patient>
          initialData={
            selectedPatient || {
              patientId: 0,
              breed: "",
              specie: {id:0, name:""},
              name: "",
              age: 0,
              ownerId: null,
            }
          }
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          fields={patientFields}
          title={selectedPatient ? "Edit Patient" : "Create Patient"}
        />
      )}
    </>
  );
}

export default Patients;
