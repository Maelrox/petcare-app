import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import type { Appointment } from '../../../types/AppointmentType';
import type { Veterinary } from '../../../types/VeterinaryType';
import '../../../styles/Calendar.css';
import Calendar from '../../common/calendar/Calendar';

interface AppointmentsProps {
}

const dummyAppointments: Appointment[] = [
  { patient_id: 1, vet_id: 1, appointment_date: "2024-09-02T10:00:00Z", reason: "Check-up", status: "Pending" },
  { patient_id: 2, vet_id: 2, appointment_date: "2024-09-02T11:00:00Z", reason: "Vaccination Natsu Emilio Tibursio", status: "Confirmed" },
  { patient_id: 2, vet_id: 2, appointment_date: "2024-09-02T11:00:00Z", reason: "Vaccination Natsu Emilio Tibursio", status: "Confirmed" },
  { patient_id: 2, vet_id: 2, appointment_date: "2024-09-03T11:00:00Z", reason: "Vaccination Natsu Emilio Tibursio", status: "Confirmed" },
  { patient_id: 2, vet_id: 2, appointment_date: "2024-09-04T11:00:00Z", reason: "Vaccination Natsu Emilio Tibursio", status: "Confirmed" },
  { patient_id: 2, vet_id: 2, appointment_date: "2024-09-05T11:00:00Z", reason: "Vaccination Natsu Emilio Tibursio", status: "Confirmed" },
  { patient_id: 2, vet_id: 2, appointment_date: "2024-09-06T11:00:00Z", reason: "Vaccination Natsu Emilio Tibursio", status: "Confirmed" },
  { patient_id: 2, vet_id: 2, appointment_date: "2024-09-07T11:00:00Z", reason: "Vaccination Natsu Emilio Tibursio", status: "Confirmed" },
  { patient_id: 2, vet_id: 2, appointment_date: "2024-09-08T11:00:00Z", reason: "Vaccination Natsu Emilio Tibursio", status: "Confirmed" },
  { patient_id: 2, vet_id: 2, appointment_date: "2024-09-09T11:00:00Z", reason: "Vaccination Natsu Emilio Tibursio", status: "Confirmed" },
];

const dummyVeterinaries: Veterinary[] = [
  { vet_id: 1, identification: "V001", name: "Dr. Smith", phone: "123-456-7890", specialization: "General" },
  { vet_id: 2, identification: "V002", name: "Dr. Johnson", phone: "098-765-4321", specialization: "Surgery" },
];

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(dummyAppointments);
  const [veterinaries, setVeterinaries] = useState<Veterinary[]>(dummyVeterinaries);
  const [selectedVet, setSelectedVet] = useState<number | null>(null);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  useEffect(() => {
    filterAppointments();
  }, [selectedVet]);

  const filterAppointments = () => {
    if (selectedVet !== null) {
      setFilteredAppointments(
        appointments.filter(app => app.vet_id === selectedVet)
      );
    } else {
      setFilteredAppointments(appointments);
    }
  };

  const handleVetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVet(Number(e.target.value));
  };

  const handleDateClick = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
    const appointmentsOnDate = appointments.filter(app =>
      dayjs(app.appointment_date).isSame(date, 'day')
    );
    setFilteredAppointments(appointmentsOnDate);
  };

  return (
    <div className="p-4">
      <h2 className="text-center mt-4 text-color_brand font-bold">Appointments Calendar</h2>

      <div className="my-4">
        <label htmlFor="vet-select" className="block text-sm font-medium text-gray-700">Filter by Veterinary</label>
        <select
          id="vet-select"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={handleVetChange}
        >
          <option value="">All Veterinaries</option>
          {veterinaries.map(vet => (
            <option key={vet.vet_id} value={vet.vet_id}>
              {vet.name} - {vet.specialization}
            </option>
          ))}
        </select>
      </div>

      <Calendar
        appointments={filteredAppointments}
        onDateClick={handleDateClick}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {filteredAppointments.map(app => (
          <div key={app.patient_id + app.appointment_date} className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-semibold">{dayjs(app.appointment_date).format('MMM D, YYYY')}</h3>
            <p className="text-sm text-gray-600">Time: {dayjs(app.appointment_date).format('h:mm A')}</p>
            <p className="text-sm">Reason: {app.reason}</p>
            <p className="text-sm">Status: <span className={`font-semibold ${app.status === 'Confirmed' ? 'text-green-500' : 'text-red-500'}`}>{app.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;