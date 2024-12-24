import { useState, useEffect } from "react";
import ButtonIcon from "../../common/buttons/ButtonIcon";
import FormModal from "../FormModal";
import Modal from "../../common/modals/Modal";
import { addToast } from "../../utils/toasterStore";
import { patientFilesField, type PatientFile } from "../../../types/PatientFilesType";
import type { Patient } from "../../../types/PatientType";
import { uploadFile } from "../../../hooks/modules/usePatientFile";

interface PatientFilesProps {
  patient: Patient | undefined;
}

const PatientFiles: React.FC<PatientFilesProps> = ({ patient }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatientFiles, setSelectedPatientFiles] = useState<PatientFile | null>(null);
  //const data = (getPatientFiles, patientFilesField);

  const handleEdit = (patientFiles: PatientFile) => {
    setSelectedPatientFiles(patientFiles);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedPatientFiles(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatientFiles(null);
  };

  const handleSubmit = async (data: PatientFile) => {
    let responseMessage;
    if (data.file) {
      responseMessage = await uploadFile(data, 31) || "";
    }
    return responseMessage;
  };
   
  const handleDelete = async (patientFile: PatientFile, patientId: number) => {
    if (patientFile) {
      const isConfirmed = window.confirm(`Are you sure you want to delete the selected file"?`);
      if (isConfirmed) {
        const responseMessage = "TODO"; //await deletePatientFile(patientFile, patientId);
        if (responseMessage) {
          addToast(responseMessage)
        }
        return responseMessage;
      }
    }
  };

  return (
    <>
      <h2 className="text-center mt-4 text-color_brand font-bold">
        Patient Files
      </h2>
      <div className="flex flex-col md:flex-row md:justify-between mb-0">
        <div className="w-full md:w-1/3 pt-4 flex lg:justify-end max-h-16 mr-4">
          <ButtonIcon
            type="submit"
            onClick={() => handleAddClick()}
          >
            New File
          </ButtonIcon>
        </div>
      </div>
      <div>
        
      </div>
      <FormModal<PatientFile, PatientFile, PatientFile>
        initialData={selectedPatientFiles || { description: "", fileName : "" }}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        maxSize="max-w-md"
        fields={patientFilesField}
        title={selectedPatientFiles ? "Edit Patient Files" : "Create Patient Files"}
        description="Upload Clinical History"
      />
    </>
  );
}

export default PatientFiles;
