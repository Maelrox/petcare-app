import { useState, useEffect } from "react";
import ButtonIcon from "../../common/buttons/ButtonIcon";
import FormModal from "../FormModal";
import Modal from "../../common/modals/Modal";
import { addToast } from "../../utils/toasterStore";
import { patientFilesField, type PatientFile } from "../../../types/PatientFilesType";
import type { Patient } from "../../../types/PatientType";
import { getPatientFiles, uploadFile } from "../../../hooks/modules/usePatientFile";
import { FileText, Image, File, Trash2, Upload } from "lucide-react";

interface PatientFilesProps {
  patient: Patient | undefined;
}

const PatientFiles: React.FC<PatientFilesProps> = ({ patient }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatientFiles, setSelectedPatientFiles] = useState<PatientFile | null>(null);
  const [files, setFiles] = useState<PatientFile[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      if (patient?.patientId) {
        const patientFiles = await getPatientFiles(patient.patientId);
        setFiles(patientFiles || []);
      }
    };
    fetchFiles();
  }, [patient]);

  const handleOpen = (patientFiles: PatientFile) => {
    window.open(patientFiles.filePath, '_blank');
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
      responseMessage = await uploadFile(data, patient?.patientId) || "";
      const updatedFiles = await getPatientFiles(patient?.patientId);
      setFiles(updatedFiles || []);
    }
    return responseMessage;
  };

  const handleDelete = async (patientFile: PatientFile) => {
    if (patientFile && patientFile?.fileId) {
      const isConfirmed = window.confirm(`Are you sure you want to delete the selected file"?`);
      if (isConfirmed) {
        const responseMessage = "TODO"; //await deletePatientFile(patientFile, patientId);
        if (responseMessage) {
          addToast(responseMessage);
          const updatedFiles = await getPatientFiles(patientFile?.fileId);
          setFiles(updatedFiles || []);
        }
        return responseMessage;
      }
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'pdf':
        return <FileText className="w-12 h-12 text-color_brand" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <Image className="w-12 h-12 text-color_brand" />;
      default:
        return <File className="w-12 h-12 text-gray-500" />;
    }
  };

  return (
    <>
      <h2 className="text-center mt-4 text-color_brand font-bold">
        Patient Files
      </h2>
      <div className="flex flex-col md:flex-row md:justify-between mb-0">
        <div className="w-full md:w-full pt-4 flex lg:justify-end max-h-16">
          <ButtonIcon
            type="submit"
            onClick={() => handleAddClick()}
          >
            <Upload className="mr-2" />
            Upload New File
          </ButtonIcon>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {files && files.map((file: PatientFile, index: number) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative"
          >
            <div 
              className="flex flex-col items-center space-y-2 cursor-pointer"
              onClick={() => handleOpen(file)}
            >
              {getFileIcon(file.filePath || "")}
              <span className="text-sm font-medium text-color_brand text-center break-all">
                {file.fileName}
              </span>
              <span className="text-xs text-color_brand text-center break-all">
                {file.description}
              </span>
              {file.fileDate && (
                <span className="text-xs text-gray-400">
                  {new Date(file.fileDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <button
              className="absolute bottom-1 right-1 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(file, patient?.patientId || 0);
              }}
              aria-label="Delete file"
            >
              <Trash2 className="w-6 h-6 text-rose-600" />
            </button>
          </div>
        ))}
      </div>
      <FormModal<PatientFile, PatientFile, PatientFile>
        initialData={selectedPatientFiles || { description: "", fileName: "" }}
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