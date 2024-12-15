import { useState, useEffect } from "react";
import DataTable from "../../common/tables/Table";
import usePaginatedData from "../../../hooks/modules/usePaginatedData";
import ButtonIcon from "../../common/buttons/ButtonIcon";
import FilterControls from "../../common/tables/TableFilterControls";
import FormModal from "../FormModal";
import { ownerFields, type Owner } from "../../../types/OwnerType";
import { createOwner, searchOwners, updateOwner } from "../../../hooks/modules/useOwner";
import { PlusSquareIcon } from "lucide-react";
import type { IdentificationType } from "../../../types/AuthTypes";

type OwnerProps = {
  handleSelect?: (rowData: Owner) => void;
}

function Owners({ handleSelect }: OwnerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const paginatedData = usePaginatedData(searchOwners, ownerFields);

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

  const handleEdit = (owner: Owner) => {
    setSelectedOwner(owner);
    setIsModalOpen(true);
  };

  const handleDelete = async (owner: Owner) => {
    if (owner.ownerId) {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete the owner "${owner.name}"?`
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
    setSelectedOwner(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOwner(null);
  };

  const handleSubmit = async (data: Owner) => {
    const responseMessage = data.ownerId
      ? await updateOwner(data)
      : await createOwner(data);
    if (responseMessage) {
      setRefresh(true);
    }
    return responseMessage;
  };

  return (
    <>
      <h2 className="text-center text-color_brand font-bold">Owners</h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between mb-0">
        <div className="w-full lg:w-2/3 md:pr-2 md:mb-0">
          <FilterControls
            setRefresh={setRefresh}
            addFilter={addFilter}
            removeFilter={removeFilter}
            availableFilters={availableFilters.current}
            filters={filters}
          />
        </div>
        <div className="w-full md:w-1/3 flex lg:justify-end max-h-16 pr-4">
          <ButtonIcon
            type="submit"
            text="New Owner"
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
          handleSelect={handleSelect}
          isLoading={isLoading}
          configFields={ownerFields}
        />
      </div>
      <FormModal<Owner, IdentificationType>
        initialData={
          selectedOwner || {
            ownerId: 0,
            identification: "",
            identificationType: {id:0, name:""},
            name: "",
            phone: "",
            address: "",
          }
        }
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        fields={ownerFields}
        maxSize="max-w-md"
        title={selectedOwner ? "Edit Owner" : "Create Owner"}
        description="Specialist in animal health"
      />
    </>
  );
}

export default Owners;
