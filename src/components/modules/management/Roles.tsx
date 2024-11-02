import { useState, useEffect } from "react";
import DataTable from "../../common/tables/Table";
import usePaginatedData from "../../../hooks/usePaginatedData";
import ButtonIcon from "../../common/buttons/ButtonIcon";
import addIcon from "../../../assets/icons/table-add.png";
import {
  createRole,
  deleteRole,
  getRoles,
  updateRole,
} from "../../../hooks/useManager";
import FilterControls from "../../common/tables/TableFilterControls";
import type { Role } from "../../../types/AuthTypes";
import FormModal from "../FormModal";
import { roleFields } from "../../../types/FormFieldConfig";
import { PlusIcon } from "lucide-react";

type RolesProps<T> = {
  handleSelect?: (rowData: T) => void;
}

// simple CRUD
function Roles<T>({ handleSelect }: RolesProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const paginatedData = usePaginatedData(getRoles, roleFields);

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

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleDelete = async (role: Role) => {
    if (role.id) {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete the role "${role.name}"?`
      );
      if (isConfirmed) {
        const responseMessage = await deleteRole(role.id);
        if (responseMessage) {
          setRefresh(true);
        }
        return responseMessage;
      }
    }
  };

  const handleAddClick = () => {
    setSelectedRole(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRole(null);
  };

  const handleSubmit = async (data: Role) => {
    const responseMessage = data.id
      ? await updateRole(data)
      : await createRole(data);
    if (responseMessage) {
      setRefresh(true);
    }
    return responseMessage;
  };

  return (
    <>
      <h2 className="text-center text-color_brand font-bold">Roles</h2>
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
            text="New Role"
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
          configFields={roleFields}
        />
      </div>
      <FormModal<Role>
        initialData={selectedRole || { id: 0, name: "" }}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        maxSize="max-w-md"
        fields={roleFields}
        title={selectedRole ? "Edit Role" : "Create Role"}
        description="A role contains multiple modules and actions, which can be assigned to users"
      />
    </>
  );
}

export default Roles;
