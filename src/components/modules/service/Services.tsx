import { useState, useEffect } from "react";
import DataTable from "../../common/tables/Table";
import usePaginatedData from "../../../hooks/modules/usePaginatedData";
import ButtonIcon from "../../common/buttons/ButtonIcon";
import FilterControls from "../../common/tables/TableFilterControls";
import FormModal from "../FormModal";
import { PlusIcon } from "lucide-react";
import { serviceFields, type Service } from "../../../types/ServiceType";
import { createService, getService, updateService } from "../../../hooks/modules/useService";

type ServicesProps = {
  handleSelect?: (rowData: Service) => void;
}

function Services({ handleSelect }: ServicesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const paginatedData = usePaginatedData(getService, serviceFields);

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

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleDelete = async (service: Service) => {
    if (service.id) {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete the service "${service.name}"?`
      );
      if (isConfirmed) {
        alert("Not implemented");
      }
    }
  };

  const handleAddClick = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleSubmit = async (data: Service) => {
    const responseMessage = data.id
      ? await updateService(data)
      : await createService(data);
    if (responseMessage) {
      setRefresh(true);
    }
    return responseMessage;
  };

  return (
    <>
      <h2 className="text-center text-color_brand font-bold">Service</h2>
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
        <div className="w-full md:w-1/3 flex lg:justify-end max-h-16 pr-4">
          <ButtonIcon
            type="submit"
            text="New Service"
            onClick={() => handleAddClick()}
          >
            <PlusIcon size={24}/>
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
          configFields={serviceFields}
        />
      </div>
      <FormModal<Service, Service>
        initialData={selectedService || { id: 0, name: "", description: "", price: 0 }}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        maxSize="max-w-md"
        fields={serviceFields}
        title={selectedService ? "Edit Service" : "Create Service"}
        description="The services you add will be available for direct manual billing and can also be associated to appointments"
      />
    </>
  );
}

export default Services;
