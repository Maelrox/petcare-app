import { useState, useEffect } from "react";
import DataTable from "../../common/tables/Table";
import usePaginatedData from "../../../hooks/usePaginatedData";
import ButtonIcon from "../../common/buttons/ButtonIcon";
import FilterControls from "../../common/tables/TableFilterControls";
import FormModal from "../FormModal";
import { PlusSquareIcon } from "lucide-react";
import { consultFields } from "../../../types/FormFieldConfig";
import { createConsult, searchConsult, updateConsult } from "../../../hooks/useConsult";
import type { Consult } from "../../../types/ConsultType";

function Consults() {
  const emptyFilter: Consult = {
    patientId: 0,
    vetId: 0,
    initialDate: "",
    finalDate: "",
    reason: "",
    status: "",
    appointmentDate: "",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Consult | null>(null);
  const paginatedData = usePaginatedData(searchConsult);

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

  const handleEdit = (consult: Consult) => {
    setSelectedPatient(consult);
    setIsModalOpen(true);
  };

  const handleDelete = async (consult: Consult) => {
    if (consult.consultationId) {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete the consult "${consult.consultationId}"?`
      );
      if (isConfirmed) {
        const responseMessage = "TODO";
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

  const handleSubmit = async (data: Consult) => {
    const responseMessage = data.patientId
      ? await updateConsult(data)
      : await createConsult(data);
    if (responseMessage) {
      setRefresh(true);
    }
    return responseMessage;
  };

  return (
    <>
      <h2 className="text-center text-color_brand font-bold">Patient Consult</h2>
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
            text="Attend Patient"
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
          configFields={consultFields}
        />
      </div>
      {isModalOpen && (
        <FormModal<Consult>
          initialData={selectedPatient}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          fields={consultFields}
          title={selectedPatient ? "Edit Consult" : "Create Consult"}
        />
      )}
    </>
  );
}

export default Consults;
