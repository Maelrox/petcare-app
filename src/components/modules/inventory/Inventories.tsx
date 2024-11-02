import { useState, useEffect } from "react";
import DataTable from "../../common/tables/Table";
import usePaginatedData from "../../../hooks/usePaginatedData";
import ButtonIcon from "../../common/buttons/ButtonIcon";
import FilterControls from "../../common/tables/TableFilterControls";
import FormModal from "../FormModal";
import { PlusIcon } from "lucide-react";
import { createInventory, getInventory, updateInventory } from "../../../hooks/useInventory";
import { inventoryFields, type Inventory } from "../../../types/InventoryType";

type InventoriesProps = {
  handleSelect?: (rowData: Inventory) => void;
}

function Inventories({ handleSelect }: InventoriesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null);
  const paginatedData = usePaginatedData(getInventory, inventoryFields);

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

  const handleEdit = (inventory: Inventory) => {
    setSelectedInventory(inventory);
    setIsModalOpen(true);
  };

  const handleDelete = async (inventory: Inventory) => {
    if (inventory.inventoryId) {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete the inventory "${inventory.name}"?`
      );
      if (isConfirmed) {
        alert("Not implemented");
      }
    }
  };

  const handleAddClick = () => {
    setSelectedInventory(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInventory(null);
  };

  const handleSubmit = async (data: Inventory) => {
    const responseMessage = data.inventoryId
      ? await updateInventory(data)
      : await createInventory(data);
    if (responseMessage) {
      setRefresh(true);
    }
    return responseMessage;
  };

  return (
    <>
      <h2 className="text-center text-color_brand font-bold">Inventory</h2>
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
        <div className="w-full md:w-1/3 flex lg:justify-end max-h-16">
          <ButtonIcon
            type="submit"
            text="New Inventory"
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
          configFields={inventoryFields}
        />
      </div>
      <FormModal<Inventory, Inventory>
        initialData={selectedInventory || { inventoryId: 0, name: "", description: "", price: 0, quantity:0 }}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        maxSize="max-w-md"
        fields={inventoryFields}
        title={selectedInventory ? "Edit Inventory" : "Create Inventory"}
        description="Inventory to sell"
      />
    </>
  );
}

export default Inventories;
