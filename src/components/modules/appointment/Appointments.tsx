import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { CalendarDays, LayoutGrid, CalendarPlus } from "lucide-react";
import { appointmentFields, type Appointment } from "../../../types/AppointmentType";
import type { Veterinary } from "../../../types/VeterinaryType";
import "../../../styles/Calendar.css";
import Calendar from "../../common/calendar/Calendar";
import {
  createAppointment,
  deleteAppointment,
  getAppointment,
  searchAppointment,
  updateAppointment,
} from "../../../hooks/modules/useAppointment";
import FormModal from "../FormModal";
import { fetchVeterinaries } from "../../../hooks/modules/useVeterinary";
import { filterOwners } from "../../../hooks/modules/useOwner";
import CalendarGrid from "../../common/calendar/CalendarGrid";
import useDebounce from "../../../hooks/modules/useDebounce";
import usePermission from "../../../hooks/modules/usePermission";
import type { SelectOption } from "../../../types/FormType";
import ButtonIcon from "../../common/buttons/ButtonIcon";
import { addToast } from "../../utils/toasterStore";
import AppointmentFilter from "./AppointmentsFilter";

const Appointments: React.FC = () => {
  const { hasPermission } = usePermission();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [veterinaries, setVeterinaries] = useState<Veterinary[]>([]);
  const [selectedVet, setSelectedVet] = useState<SelectOption | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<SelectOption | null>(null);
  const [initialDate, setInitialDate] = useState<string>("");
  const [finalDate, setFinalDate] = useState<string>("");
  const [viewMode, setViewMode] = useState<"cards" | "calendar">("cards");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [searchByIdentification, setSearchByIdentification] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVeterinaries = await fetchVeterinaries();
        if (fetchedVeterinaries) {
          setVeterinaries(fetchedVeterinaries);
        }
      } catch (err) {
        console.error("Error fetching veterinaries:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (veterinaries.length > 0) {
      fetchAppointments();
    }
  }, [selectedVet, selectedOwner, initialDate, finalDate, veterinaries]);

  const fetchAppointments = async () => {
    try {
      const filter: Partial<Appointment> = {
        patientId: 0,
        vetId: selectedVet?.value || 0,
        ownerId: selectedOwner?.value || 0,
        reason: "",
        status: "",
        initialDate: initialDate ? dayjs(initialDate).format("YYYY-MM-DD 00:00") : undefined,
        finalDate: finalDate ? dayjs(finalDate).format("YYYY-MM-DD 23:59") : undefined,
      };
      const fetchedAppointments = await searchAppointment(filter);
      if (fetchedAppointments) {
        fetchedAppointments.forEach(appointment => {
          const vet = veterinaries.find(v => v.vetId === appointment.vetId);
          appointment.vetName = vet?.name || 'Unknown Veterinary';
        });
        setAppointments(fetchedAppointments);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const vetOptions: SelectOption[] = [
    { value: 0, label: "All Veterinaries" },
    ...veterinaries.map((vet) => ({
      value: vet.vetId,
      label: `${vet.name} - ${vet.specialization}`,
    })),
  ];

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "cards" ? "calendar" : "cards"));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleAddClick = () => {
    setSelectedAppointment(null);
    setIsModalOpen(true);
  };

  const handleVetChange = (selectedOption: SelectOption | null) => {
    setSelectedVet(selectedOption);
  };

  const handleOwnerChange = (selectedOption: SelectOption | null) => {
    setSelectedOwner(selectedOption);
  };

  const handleAppointmentEdit = async (appointmentId: number) => {
    const appointmentToEdit = await getAppointment(appointmentId);
    if (appointmentToEdit) {
      setSelectedAppointment(appointmentToEdit);
      setIsModalOpen(true);
    }
  };

  const handleAppointmentDelete = async (appointmentId: number) => {
    if (appointmentId) {
      const isConfirmed = window.confirm(
        `Are you sure you want to cancel this consult?`
      );
      if (isConfirmed) {
        const responseMessage = await deleteAppointment(appointmentId);
        if (responseMessage) {
          addToast(responseMessage)
          fetchAppointments();
        }
      }
    }
  };

  const handleSubmit = async (data: Appointment) => {
    const formattedDate = dayjs(data.appointmentDate).format("YYYY-MM-DDTHH:mm");
    //    data.serviceId = data?.service?.id;
    data.appointmentDate = formattedDate;
    const responseMessage = !data.appointmentId
      ? await createAppointment(data)
      : await updateAppointment(data);
    fetchAppointments();
    return responseMessage;
  };

  const debouncedFilterOwners = useDebounce(async (
    inputValue: string,
    callback: (options: SelectOption[]) => void
  ) => {
    if (inputValue.length < 3) {
      callback([]);
      return;
    }
    try {
      const owners = await filterOwners(inputValue, searchByIdentification);
      const options = owners?.map((owner) => ({
        value: owner.ownerId,
        label: `${owner.identification} - ${owner.name}`
      })) || [];
      callback(options);
    } catch (error) {
      console.error("Error loading owner options:", error);
      callback([]);
    }
  }, 1000);

  const loadOwnerOptions = (inputValue: string, callback: (options: SelectOption[]) => void) => {
    debouncedFilterOwners(inputValue, callback);
  };

  return (
    <div className="p-4 pt-0">
      {hasPermission("appointment", "view") ? (
        <div className="p-2 pb-0">
          <AppointmentFilter
            selectedVet={selectedVet}
            selectedOwner={selectedOwner}
            initialDate={initialDate}
            finalDate={finalDate}
            searchByIdentification={searchByIdentification}
            vetOptions={vetOptions}
            onVetChange={handleVetChange}
            onOwnerChange={handleOwnerChange}
            onInitialDateChange={setInitialDate}
            onFinalDateChange={setFinalDate}
            onSearchModeChange={() => setSearchByIdentification(!searchByIdentification)}
            loadOwnerOptions={loadOwnerOptions}
          />

          <div className="flex justify-end mt-2 space-x-2">
            <ButtonIcon onClick={handleAddClick}>
              <CalendarPlus size={24} />
            </ButtonIcon>
            <ButtonIcon onClick={toggleViewMode}>
              {viewMode === "cards" ? <CalendarDays size={24} /> : <LayoutGrid size={24} />}
            </ButtonIcon>
          </div>

          {viewMode === "calendar" && (
            <Calendar
              appointments={appointments}
              onAppointmentClick={handleAppointmentEdit}
            />
          )}
          {viewMode === "cards" && (
            <CalendarGrid
              appointments={appointments}
              onEditAppointment={handleAppointmentEdit}
              onDeleteAppointment={handleAppointmentDelete}
            />
          )}

          {isModalOpen && (
            <FormModal<Appointment, Veterinary, Appointment>
              initialData={selectedAppointment || {
                patientId: 0,
                vetId: 0,
                ownerId: 0,
                initialDate: "",
                finalDate: "",
                reason: "",
                status: "SCHEDULED",
                appointmentDate: "",
              }}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSubmit={handleSubmit}
              fields={appointmentFields}
              maxSize="max-w-md"
              title={selectedAppointment ? "Edit Appointment" : "Create Appointment"}
            />
          )}
          {appointments.length === 0 && <span>No appointments found</span>}
        </div>
      ) : (
        <h2 className="text-center text-color_brand font-bold">You don't have permissions to access this module</h2>
      )}
    </div>
  );
};

export default Appointments;
