import { useState, useEffect } from "react";
import DataTable from "../../common/tables/Table";
import usePaginatedData from "../../../hooks/modules/usePaginatedData";
import ButtonIcon from "../../common/buttons/ButtonIcon";
import FilterControls from "../../common/tables/TableFilterControls";
import FormModal from "../FormModal";

import { PlusSquareIcon } from "lucide-react";
import { registerFields, type RegisterRequest } from "../../../types/RegisterRequestType";
import { search, update, register } from "../../../hooks/modules/useEmployee";

type EmployeeProps = {
  handleSelect?: (rowData: RegisterRequest) => void;
}

function Employees({ handleSelect }: EmployeeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<RegisterRequest | null>(null);
  const paginatedData = usePaginatedData(search, registerFields);

  const emptyRegisterRequest: RegisterRequest = {
    username: "",
    name: "",
    password: "",
    email: "",
    phone: "",
    country: "",
    roles: [],
    token: ""
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

  const handleEdit = (registerRequest: RegisterRequest) => {
    setSelectedEmployee(registerRequest);
    setIsModalOpen(true);
  };

  const handleDelete = async (registerRequest: RegisterRequest) => {
    if (registerRequest.username) {
      const isConfirmed = window.confirm(
        `Are you sure you want to disable the employee "${registerRequest.username}"?`
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
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleSubmit = async (data: RegisterRequest) => {
    const responseMessage = data.username
      ? await register(data)
      : await update(data);
    if (responseMessage) {
      setIsModalOpen(false);
      setRefresh(true);
    }
    return responseMessage;
  };

  return (
    <>
      <h2 className="text-center text-color_brand font-bold">Employees</h2>
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
        <div className="w-full md:w-1/3 flex lg:justify-end max-h-16">
          <ButtonIcon
            type="submit"
            text="New Employee"
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
          configFields={registerFields}
        />
      </div>
      <FormModal<RegisterRequest, RegisterRequest>
      initialData={selectedEmployee || emptyRegisterRequest}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
      fields={registerFields}
      maxSize="max-w-md"
      title={selectedEmployee ? "Edit Employee" : "Create Employee"}
      description="Register an Employee for your company"
      />
    </>
  );
}

export default Employees;
