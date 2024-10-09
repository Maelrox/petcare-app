import { useState, useEffect } from "react";
import DataTable from "../../common/tables/Table";
import usePaginatedData from "../../../hooks/usePaginatedData";
import ButtonIcon from "../../common/buttons/ButtonIcon";
import addIcon from "../../../assets/icons/table-add.png";
import {
  createPermission,
  deletePermission,
  getPermissions,
  updatePermission,
} from "../../../hooks/useManager";
import FilterControls from "../../common/tables/TableFilterControls";
import type { Permission, Role } from "../../../types/AuthType";
import FormModal from "../FormModal";
import { permissionFields } from "../../../types/FormFieldConfig";
import Modal from "../../common/modals/Modal";
import PermissionRolesForm from "./PermissionRolesForm";
import PermissionModulesForm from "./PermissionModulesForm";
import { addToast } from "../../utils/toasterStore";

// simple CRUD
function Permissions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAssignRolesOpen, setIsModalAssignRolesOpen] = useState(false);
  const [isModalAssignModulesOpen, setIsModalAssignModulesOpen] =
    useState(false);

  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);
  const paginatedData = usePaginatedData(getPermissions);

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

  const handleEdit = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedPermission(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPermission(null);
  };

  const handleSubmit = async (data: Permission) => {
    const responseMessage = data.id
      ? await updatePermission(data)
      : await createPermission(data);
    if (responseMessage) {
      setRefresh(true);
    }
    return responseMessage;
  };

  const handleAssignRole = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsModalAssignRolesOpen(true);
  };

  const handleCloseModalAssignRole = () => {
    setIsModalAssignRolesOpen(false);
    setSelectedPermission(null);
  };

  const handleCloseModalAssignModule = () => {
    setIsModalAssignModulesOpen(false);
    setSelectedPermission(null);
  };

  const handleAssignModule = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsModalAssignModulesOpen(true);
  };

  
  const handleDelete = async (permission: Permission) => {
    if (permission.id) {
      const isConfirmed = window.confirm(`Are you sure you want to delete the permission "${permission.name}"?`);
      if (isConfirmed) {
        const responseMessage = await deletePermission(permission.id);
        if (responseMessage) {
          setRefresh(true);
          addToast(responseMessage)
        }
        return responseMessage;
      }
    }
  };

  return (
    <>
      <h2 className="text-center mt-4 text-color_brand font-bold">
        Permissions
      </h2>
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
          >
            New Permission
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
          handleAdditionalAction={handleAssignRole}
          handleAdditionalAction2={handleAssignModule}
          isLoading={isLoading}
          configFields={permissionFields}
        />
      </div>
      <FormModal<Permission>
        initialData={selectedPermission || { id: 0, name: "" }}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        maxSize="max-w-md"
        fields={permissionFields}
        title={selectedPermission ? "Edit Permission" : "Create Permission"}
        description="A permission contains multiple actions for different modules"
      />

      <Modal
        isOpen={isModalAssignRolesOpen}
        onClose={handleCloseModalAssignRole}
        maxSize="max-w-md"
        title="Add roles to permission "
        children={
          selectedPermission && (
            <PermissionRolesForm permission={selectedPermission} />
          )
        }
      ></Modal>
      <Modal
        isOpen={isModalAssignModulesOpen}
        maxSize="max-w-md"
        onClose={handleCloseModalAssignModule}
        title="Add modules to permission "
        children={
          selectedPermission && (
            <PermissionModulesForm permission={selectedPermission} />
          )
        }
      ></Modal>
    </>
  );
}

export default Permissions;
