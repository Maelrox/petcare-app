import { useState, useEffect } from "react";
import DataTable from "../../common/tables/Table";
import ButtonIcon from "../../common/buttons/ButtonIcon";
import FormModal from "../FormModal";
import { PlusSquareIcon } from "lucide-react";
import { createConsult, deleteConsult, getConsult, searchConsult, updateConsult } from "../../../hooks/modules/useConsult";
import { consultFields, type Consult } from "../../../types/ConsultType";
import usePaginatedDataFilter from "../../../hooks/modules/usePaginatedDataFilter";
import dayjs from "dayjs";
import type { Veterinary } from "../../../types/VeterinaryType";
import { addToast } from "../../utils/toasterStore";

function Consults() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsult, setSelectedConsult] = useState<Consult | null>(null);
  const paginatedData = usePaginatedDataFilter(searchConsult);

  const emptyConsult: Consult = {
    patientId: 0,
    vetId: 0,
    finalDate: "",
    reason: "",
    status: "ATTENDED",
    appointmentId: 0,
    consultationDate: "",
    treatment: "",
    notes: "",
    diagnosis: ""
  };

  useEffect(() => {
    setRefresh(true);
  }, []);

  const {
    data,
    pagination,
    handlePaginationChange,
    totalRows,
    setRefresh,
    isLoading,
  } = paginatedData;

  const handleEdit = async (consult: Consult) => {
    const consultToEdit = await getConsult(consult.consultationId || 0);
    if (consultToEdit) {
      setSelectedConsult(consultToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (consult: Consult) => {
    if (consult.consultationId) {
      const isConfirmed = window.confirm(
        `Are you sure you want to cancel this consult?`
      );
      if (isConfirmed) {
        const responseMessage = await deleteConsult(consult.consultationId || 0);
        if (responseMessage) {
          addToast(responseMessage)
          setRefresh(true);
        }
        return responseMessage;
      }
    }
  };

  const handleAddClick = () => {
    setSelectedConsult(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedConsult(null);
  };

  const handleSubmit = async (data: Consult) => {
    let responseMessage;
    if (data.consultationId) {
      data.consultationDate = dayjs(data.consultationDate).format('YYYY-MM-DDTHH:mm');
      data.followUpDate = data.followUpDate ? dayjs(data.followUpDate).format('YYYY-MM-DDTHH:mm') : undefined;
      responseMessage = await updateConsult(data);
    } else {
      responseMessage = await createConsult(data);
    }

    if (responseMessage) {
      setRefresh(true);
    }
    return responseMessage;
  };

  return (
    <>
      <h2 className="text-center text-color_brand font-bold">Patient Consult</h2>
      <div className="flex flex-col p-0 items-center md:flex-row md:justify-between mb-0">
        
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
        <FormModal<Consult, Veterinary>
          initialData={selectedConsult || emptyConsult}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          fields={consultFields}
          maxSize="max-w-full"
          title={selectedConsult ? "Edit Consult" : "Attend Consult"}
        />
      )}
    </>
  );
}

export default Consults;
