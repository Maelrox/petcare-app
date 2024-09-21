import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Select from "react-select";
import { CalendarDays, LayoutGrid, CalendarPlus } from "lucide-react";
import type { Appointment } from "../../../types/AppointmentType";
import type { Veterinary } from "../../../types/VeterinaryType";
import "../../../styles/Calendar.css";
import Calendar from "../../common/calendar/Calendar";
import {
  createAppointment,
  getAppointment,
  searchAppointment,
  updateAppointment,
} from "../../../hooks/useAppointment";
import FormModal from "../FormModal";
import { appointmentFields } from "../../../types/FormFieldConfig";
import { fetchVeterinaries } from "../../../hooks/useVeterinary";

const Appointments: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[] | undefined>(
    []
  );
  const [veterinaries, setVeterinaries] = useState<Veterinary[]>();
  const [selectedVet, setSelectedVet] = useState<SelectOption | null>(null);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[] | undefined
  >([]);
  const [initialDate, setInitialDate] = useState<string>("");
  const [finalDate, setFinalDate] = useState<string>("");
  const [viewMode, setViewMode] = useState<"cards" | "calendar">("cards");
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const emptyAppointment: Appointment = {
    patientId: 0,
    vetId: 0,
    initialDate: "",
    finalDate: "",
    reason: "",
    status: "",
    appointmentDate: "",
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const fetchedAppointments = await searchAppointment(emptyAppointment);
        setAppointments(fetchedAppointments);
        setFilteredAppointments(fetchedAppointments);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };
    fetchAppointments();

    const fetchVets = async () => {
      try {
        const fetchedVeterinaries = await fetchVeterinaries();
        setVeterinaries(fetchedVeterinaries);
      } catch (err) {
        console.error("Error fetching veterinaries:", err);
      }
    };
    fetchVets();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [selectedVet, appointments, initialDate, finalDate]);

  const filterAppointments = () => {
    if (appointments) {
      let filtered = appointments;

      if (selectedVet) {
        filtered = filtered.filter((app) => app.vetId === selectedVet.value);
      }

      if (initialDate) {
        filtered = filtered.filter((app) =>
          dayjs(app.appointmentDate).isSameOrAfter(initialDate)
        );
      }

      if (finalDate) {
        filtered = filtered.filter((app) =>
          dayjs(app.appointmentDate).isSameOrBefore(finalDate)
        );
      }

      setFilteredAppointments(filtered);
    }
  };

  const handleVetChange = (selectedOption: SelectOption | null) => {
    setSelectedVet(selectedOption);
  };

  const handleAppointmentClick = async (appointmentId: number) => {
    const appointmentToEdit = await getAppointment(appointmentId);
    if (appointmentToEdit) {
      setSelectedAppointment(appointmentToEdit);
      setIsModalOpen(true);
    }
  };

  const vetOptions: SelectOption[] = [
    { value: 0, label: "All Veterinaries" },
    ...(veterinaries && veterinaries.length > 0
      ? veterinaries.map((vet) => ({
          value: vet.vetId,
          label: `${vet.name} - ${vet.specialization}`,
        }))
      : []),
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

  const handleSubmit = async (data: Appointment) => {
    const formattedDate = dayjs().format("YYYY-MM-DDTHH:mm");
    data.appointmentDate = formattedDate;
    const responseMessage = !data.appointmentId
      ? await createAppointment(data)
      : await updateAppointment(data);
    return responseMessage;
  };

  return (
    <>
      <div className="p-4 pt-0">
        <h2 className="text-center text-color_brand font-bold">Appointments</h2>

        <div className="bg-gray_light p-2">
          <div className="flex flex-wrap -mx-2 items-end">
            <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-2">
              <label
                htmlFor="vet-select"
                className="block text-sm font-medium text-color_brand mb-1"
              >
                Veterinary
              </label>
              {isMounted && (
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
              )}
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-2">
              <label
                htmlFor="initial-date"
                className="block text-sm font-medium text-color_brand mb-1"
              >
                Initial Date
              </label>
              <input
                id="initial-date"
                type="date"
                className="w-full p-1 text-color_brand"
                value={initialDate}
                onChange={(e) => setInitialDate(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-2">
              <label
                htmlFor="final-date"
                className="block text-sm font-medium text-color_brand mb-1"
              >
                Final Date
              </label>
              <input
                id="final-date"
                type="date"
                className="w-full p-1 text-color_brand"
                value={finalDate}
                onChange={(e) => setFinalDate(e.target.value)}
              />
            </div>
            <div className="w-16 px-2 mb-2 pr-4 pt-4 md:pr-8">
              <button
                className="p-2 bg-white rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-600"
                onClick={handleAddClick}
              >
                <CalendarPlus size={24} />
              </button>
            </div>
            <div className="w-16 px-2 mb-2 justify-end pr-4 pt-4 md:pr-8">
              <button
                onClick={toggleViewMode}
                className="p-2 bg-white rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-600"
              >
                {viewMode === "cards" ? (
                  <CalendarDays size={24} />
                ) : (
                  <LayoutGrid size={24} />
                )}
              </button>
            </div>
          </div>
        </div>

        {viewMode === "calendar" && (
          <Calendar
            appointments={filteredAppointments}
            onAppointmentClick={handleAppointmentClick}
          />
        )}

        {viewMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {filteredAppointments &&
              filteredAppointments.map((app) => (
                <div
                  key={app.patientId + app.appointmentDate}
                  className="p-4 border rounded-lg shadow-md bg-white"
                >
                  <h3 className="text-lg font-semibold">
                    {dayjs(app.appointmentDate).format("MMM D, YYYY")}
                  </h3>
                  <p className="text-sm text-color_brand">
                    Time: {dayjs(app.appointmentDate).format("h:mm A")}
                  </p>
                  <p className="text-sm">Reason: {app.reason}</p>
                  <p className="text-sm">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        app.status === "Confirmed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {app.status}
                    </span>
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <FormModal<Appointment>
          initialData={selectedAppointment || emptyAppointment}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          fields={appointmentFields}
          title={
            selectedAppointment ? "Edit Appointment" : "Create Appointment"
          }
        />
      )}
    </>
  );
};

export default Appointments;
