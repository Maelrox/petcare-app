import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Select from "react-select";
import AsyncSelect from "react-select/async";
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
} from "../../../hooks/useAppointment";
import FormModal from "../FormModal";
import { fetchVeterinaries } from "../../../hooks/useVeterinary";
import { filterOwners } from "../../../hooks/useOwner";
import CalendarGrid from "../../common/calendar/CalendarGrid";
import useDebounce from "../../../hooks/useDebounce";



const Appointments: React.FC = () => {
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

  const emptyAppointment: Appointment = {
    patientId: 0,
    vetId: 0,
    ownerId: 0,
    initialDate: "",
    finalDate: "",
    reason: "",
    status: "",
    appointmentDate: "",
  };

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
    fetchAppointments();
  }, [selectedVet, selectedOwner, initialDate, finalDate]);

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
    await deleteAppointment(appointmentId);
    fetchAppointments();
  };

  const handleAppointmentAttend = async (appointmentId: number) => {
    alert("Not implemented" + appointmentId);
  };

  const handleSubmit = async (data: Appointment) => {
    const formattedDate = dayjs(data.appointmentDate).format("YYYY-MM-DDTHH:mm");
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
      <h2 className="text-center text-color_brand font-bold">Appointments</h2>

      
      <div className="p-2 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
          <div className="w-full md:col-span-1">
            <label htmlFor="vet-select" className="block text-sm font-medium text-color_brand mb-1">
              Veterinary
            </label>
            <Select
              id="vet-select"
              options={vetOptions}
              value={selectedVet}
              onChange={handleVetChange}
              className="w-full"
              classNamePrefix="select"
              isClearable
              placeholder="Select a vet..."
            />
          </div>
          <div className="w-full md:col-span-2">
            <label htmlFor="owner-select" className="block text-sm font-medium text-color_brand mb-1">
              Owner
            </label>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
              <AsyncSelect
                id="owner-select"
                cacheOptions
                loadOptions={loadOwnerOptions}
                value={selectedOwner}
                onChange={handleOwnerChange}
                className="w-full md:flex-grow"
                classNamePrefix="select"
                isClearable
                placeholder={`Search by ${searchByIdentification ? 'identification' : 'name'}...`}
                noOptionsMessage={({ inputValue }) =>
                  inputValue.length < 3 ? "Please enter at least 3 characters" : "No options"
                }
              />
              <div className="flex items-center mt-2 md:mt-0">
                <input
                  type="checkbox"
                  id="search-mode"
                  checked={searchByIdentification}
                  onChange={() => setSearchByIdentification(!searchByIdentification)}
                  className="mr-2"
                />
                <label htmlFor="search-mode" className="text-sm text-color_brand whitespace-nowrap">
                  By Identification
                </label>
              </div>
            </div>
          </div>
          <div className="w-full md:col-span-1">
            <label htmlFor="initial-date" className="block text-sm font-medium text-color_brand mb-1">
              Initial Date
            </label>
            <input
              id="initial-date"
              type="date"
              className="w-full p-1 text-color_brand border border-gray-300"
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
            />
          </div>
          <div className="w-full md:col-span-1">
            <label htmlFor="final-date" className="block text-sm font-medium text-color_brand mb-1">
              Final Date
            </label>
            <input
              id="final-date"
              type="date"
              className="w-full p-1 text-color_brand border border-gray-300"
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mt-2 space-x-2">
          <button
            className="p-2 bg-white rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-600"
            onClick={handleAddClick}
          >
            <CalendarPlus size={24} />
          </button>
          <button
            onClick={toggleViewMode}
            className="p-2 bg-white rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-600"
          >
            {viewMode === "cards" ? <CalendarDays size={24} /> : <LayoutGrid size={24} />}
          </button>
        </div>
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
          onAttendAppointment={handleAppointmentAttend}
        />
      )}
      {isModalOpen && (
        <FormModal<Appointment, Veterinary>
          initialData={selectedAppointment || emptyAppointment}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          fields={appointmentFields}
          maxSize="max-w-md"
          title={selectedAppointment ? "Edit Appointment" : "Create Appointment"}
        />
      )}
      {appointments.length===0 && (<span>No appointments found</span>) }
    </div>
  );
};

export default Appointments;