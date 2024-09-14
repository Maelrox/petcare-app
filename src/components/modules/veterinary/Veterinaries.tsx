import { useState, useEffect } from "react";
import DataTable from "../../common/tables/Table";
import usePaginatedData from "../../../hooks/usePaginatedData";
import ButtonIcon from "../../common/buttons/ButtonIcon";
import addIcon from "../../../assets/icons/table-add.png";
import FilterControls from "../../common/tables/TableFilterControls";
import FormModal from "../FormModal";
import { roleFields, veterinaryFields } from "../../../types/FormFieldConfig";
import { createVeterinary, searchVeterinaries, updateVeterinary } from "../../../hooks/useVeterinary";
import type { Veterinary } from "../../../types/VeterinaryType";

// simple CRUD
function Veterinaries() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVeterinary, setSelectedVeterinary] = useState<Veterinary | null>(null);
  const paginatedData = usePaginatedData(searchVeterinaries);

  const veterinary: Veterinary = {
    vetId: 0,
    identification: "",
    identificationTypeId: 0,
    name: "",
    phone: "",
    specialization: ""
  };

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

  const handleEdit = (veterinary: Veterinary) => {
    setSelectedVeterinary(veterinary);
    setIsModalOpen(true);
  };

  const handleDelete = async (veterinary: Veterinary) => {
    if (veterinary.vetId) {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete the veterinary "${veterinary.name}"?`
      );
      if (isConfirmed) {
        const responseMessage = "TODO" //await deleteVeterinary(veterinary.vetId);
        if (responseMessage) {
          setRefresh(true);
        }
        return responseMessage;
      }
    }
  };

  const handleAddClick = () => {
    setSelectedVeterinary(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVeterinary(null);
  };

  const handleSubmit = async (data: Veterinary) => {
    const responseMessage = data.vetId
      ? await updateVeterinary(data)
      : await createVeterinary(data);
    if (responseMessage) {
      setRefresh(true);
    }
    return responseMessage;
  };

  return (
    <>
      <h2 className="text-center mt-4 text-color_brand font-bold">Veterinaries</h2>
      <div className="flex flex-col md:flex-row md:justify-between mb-0">
        <div className="w-full lg:w-2/3 md:pr-2 md:mb-0">
          <FilterControls
            setRefresh={setRefresh}
            addFilter={addFilter}
            removeFilter={removeFilter}
            availableFilters={availableFilters.current}
            filters={filters}
          />
        </div>
        <div className="w-full md:w-1/3 pt-4 flex lg:justify-end max-h-16">
          <ButtonIcon
            type="submit"
            onClick={() => handleAddClick()}
            icon={addIcon.src}
          >
            New Veterinary
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
        />
      </div>
      <FormModal<Veterinary>
        initialData={selectedVeterinary || {vetId: 0,identification:"", identificationTypeId:0, name:"", phone:"", specialization:""}}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        fields={veterinaryFields}
        title={selectedVeterinary ? "Edit Veterinary" : "Create Veterinary"}
        description="Specialist in animal health"
      />
    </>
  );
}

export default Veterinaries;
