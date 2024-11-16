import React, { useState } from "react";
import dayjs from "dayjs";
import type { Appointment } from "../../../types/AppointmentType";
import { CalendarIcon, ClockIcon } from "lucide-react";
import ButtonIcon from "../buttons/ButtonIcon";

interface CalendarProps {
  appointments: Appointment[] | undefined;
  onAppointmentClick: (appointmentId: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ appointments = [], onAppointmentClick }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [isDayView, setIsDayView] = useState<boolean>(true);
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startOfWeek = startOfMonth.startOf("week");
  const endOfWeek = endOfMonth.endOf("week");

  const days = [];
  let day = startOfWeek;

  while (day.isBefore(endOfWeek, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  const dayAppointments = appointments?.filter((app) =>
    dayjs(app.appointmentDate).isSame(currentDate, "day")
  );

  // Group appointments by hour
  const groupedAppointments = dayAppointments.reduce((acc, app) => {
    const hour = dayjs(app.appointmentDate).format("h A");
    if (!acc[hour]) acc[hour] = [];
    acc[hour].push(app);
    return acc;
  }, {} as Record<string, Appointment[]>);

  const toggleDayExpansion = (dayStr: string): void => {
    setExpandedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dayStr)) {
        newSet.delete(dayStr);
      } else {
        newSet.add(dayStr);
      }
      return newSet;
    });
  };

  return (
    <div className="calendar">

      {!isDayView ? (
        <div className="bg-color_brand text-white flex justify-between items-center p-2">

          <button
            onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
            className="text-sm px-2 py-1 bg-color_brand rounded hover:bg-rose-600 transition"
          >
            Previous
          </button>
          <span className="font-bold text-lg">{currentDate.format("MMMM YYYY")}</span>

          <button
            onClick={() => setCurrentDate(currentDate.add(1, "month"))}
            className="text-sm px-2 py-1 bg-color_brand rounded hover:bg-rose-600 transition"
          >
            Next
          </button>
        </div>
      ) : (
        <div className="bg-color_brand text-white text-center p-2">
          <span className="font-bold text-lg">{currentDate.format("dddd, MMMM D, YYYY")}</span>
        </div>
      )}

      {/* Switch between Day View and Calendar View */}
      <div className="view-toggle flex justify-center items-center mt-4 mb-2">
        <ButtonIcon
          onClick={() => setIsDayView(!isDayView)}
        >
          {isDayView ? <CalendarIcon size={20} /> : <ClockIcon size={20} />}
          {isDayView ? "Month View" : "Day View"}
        </ButtonIcon>
      </div>

      {isDayView ? (
        // Day View
        <div className="day-view rounded-lg shadow p-4">
          {dayAppointments && dayAppointments.length > 0 ? (
            Object.entries(groupedAppointments).map(([hour, apps], index) => (
              <div key={hour} className="hour-group mb-4">
                <p className="hour-label font-bold mb-2 text-gray-700">{hour}</p>
                <div className="appointments grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {apps.map((app, index) => (
                    <div
                      key={app.appointmentId}
                      onClick={() => onAppointmentClick(app.appointmentId || 0)}
                      className={`appointment-card text-white p-2 rounded shadow cursor-pointer hover:bg-rose-700 transition
                        ${index % 2 === 0 ? 'bg-rose-600' : 'bg-color_brand'}`}
                    >
                      <p className="font-bold">{dayjs(app.appointmentDate).format("h:mm A")}</p>
                      <p>{app.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No appointments for today</p>
          )}
        </div>
      ) : (
        // Calendar View
        <div className="calendar-grid grid grid-cols-7 gap-2 mt-4">
          {appointments &&
            days.map((day) => {
              const dayAppointments = appointments.filter((app) =>
                dayjs(app.appointmentDate).isSame(day, "day")
              );
              const dayStr = day.format('YYYY-MM-DD');
              const isExpanded = expandedDays.has(dayStr);

              return (
                <div
                  key={day.toString()}
                  className={`calendar-day bg-white p-2 rounded shadow ${dayAppointments.length > 0 ? "has-appointments" : ""
                    }`}
                >
                  <div className="text-xs font-bold mb-2">{day.date()}</div>
                  {(isExpanded ? dayAppointments : dayAppointments.slice(0, 2)).map((app) => (
                    <div
                      key={app.appointmentId}
                      onClick={() => onAppointmentClick(app.appointmentId || 0)}
                      className="appointment-card bg-rose-600 text-white text-sm p-1 rounded mb-1 cursor-pointer  transition"
                    >
                      {dayjs(app.appointmentDate).format("h:mm A")} - {app.reason}
                    </div>
                  ))}
                  {dayAppointments.length > 2 && !isExpanded && (
                    <button
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        toggleDayExpansion(dayStr);
                      }}
                      className="text-xs text-center text-gray-500 hover:text-gray-700 w-full cursor-pointer"
                    >
                      +{dayAppointments.length - 2} more
                    </button>
                  )}
                  {isExpanded && dayAppointments.length > 2 && (
                    <button
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        toggleDayExpansion(dayStr);
                      }}
                      className="text-xs text-gray-500 hover:text-gray-700 w-full text-center cursor-pointer"
                    >
                      Show less
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Calendar;
