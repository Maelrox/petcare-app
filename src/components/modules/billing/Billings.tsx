import { useState, useEffect } from "react";
import DataTable from "../../common/tables/Table";
import usePaginatedData from "../../../hooks/usePaginatedData";
import ButtonIcon from "../../common/buttons/ButtonIcon";
import FilterControls from "../../common/tables/TableFilterControls";
import { billingFields } from "../../../types/FormFieldConfig";
import { PlusIcon } from "lucide-react";
import type { Billing } from "../../../types/BillingType";
import { createBilling, getBilling, updateBilling } from "../../../hooks/useBilling";
import BillingModal from "./BillingModal";
import TransactionStatusTracker from "./TransactionStatusTracker";

function Billings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<Billing | null>(null);
  const paginatedData = usePaginatedData(getBilling, billingFields);
  const [showStatusTracker, setShowStatusTracker] = useState(false);
  const [currentTrx, setCurrentTrx] = useState<string | undefined>();

  const emptyBilling: Billing = {
    ownerId: 0,
    totalAmount: 0,
    transactionDate: "",
    paymentStatus: "",
    billingId: 0,
    transactionType: "",
    billingDetails: [],
    owner: undefined
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

  const handleEdit = (billing: Billing) => {
    setSelectedBilling(billing);
    setIsModalOpen(true);
  };

  const handleDelete = async (billing: Billing) => {
    if (billing.billingId) {
      const isConfirmed = window.confirm(
        `Are you sure you want to cancel the billing "${billing.billingId}"?`
      );
      if (isConfirmed) {
        alert("Not implemented");
      }
    }
  };

  const handleAddClick = () => {
    setSelectedBilling(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBilling(null);
  };

  const handleSubmit = async (data: Billing) => {
    const response = await createBilling(data);
    if (response?.trx) {
        setCurrentTrx(response.trx);
        setShowStatusTracker(true);
    }
  };

  return (
    <>
      <h2 className="text-center text-color_brand font-bold">Billing</h2>
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
            text="New Bill"
            onClick={() => handleAddClick()}
          >
            <PlusIcon size={24} />
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
          configFields={billingFields}
        />
      </div>
      {isModalOpen && (
        <BillingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          initialData={selectedBilling}
        />
      )}
      {showStatusTracker && currentTrx && (
        <TransactionStatusTracker
          trx={currentTrx}
          onClose={() => {
            setShowStatusTracker(false);
            setCurrentTrx(undefined);
            handleCloseModal();
            setRefresh(true);
          }}
        />
      )}
    </>
  );
}

export default Billings;

