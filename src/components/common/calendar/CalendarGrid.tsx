import React from "react";
import dayjs from "dayjs";
import type { Appointment } from "../../../types/AppointmentType";
import catIcon from "../../../assets/patients/cat.png";
import chickenIcon from "../../../assets/patients/chicken.png";
import cowIcon from "../../../assets/patients/cow.png";
import dogIcon from "../../../assets/patients/dog.png";
import ferretIcon from "../../../assets/patients/ferret.png";
import fishIcon from "../../../assets/patients/fish.png";
import goatIcon from "../../../assets/patients/goat.png";
import guineaPigIcon from "../../../assets/patients/guinea_pig.png";
import hamsterIcon from "../../../assets/patients/hamster.png";
import horseIcon from "../../../assets/patients/horse.png";
import lizardIcon from "../../../assets/patients/lizard.png";
import pigIcon from "../../../assets/patients/pig.png";
import sheepIcon from "../../../assets/patients/sheep.png";
import turtleIcon from "../../../assets/patients/turtle.png";
import { EditIcon, TrashIcon, UserCheck } from "lucide-react";
import ButtonIcon from "../buttons/ButtonIcon";

interface CalendarGridProps {
  appointments: Appointment[] | undefined;
  onEditAppointment: (appointmentId: number) => void;
  onDeleteAppointment: (appointmentId: number) => void;
}

const speciesIcons = {
  cat: catIcon,
  chicken: chickenIcon,
  cow: cowIcon,
  dog: dogIcon,
  ferret: ferretIcon,
  fish: fishIcon,
  goat: goatIcon,
  guineaPig: guineaPigIcon,
  hamster: hamsterIcon,
  horse: horseIcon,
  lizard: lizardIcon,
  pig: pigIcon,
  sheep: sheepIcon,
  turtle: turtleIcon,
};

const CalendarGrid: React.FC<CalendarGridProps> = ({
  appointments,
  onEditAppointment,
  onDeleteAppointment,
}) => {

  type SpeciesIconKey = keyof typeof speciesIcons;

  const getSpeciesIcon = (specieName: string) => {
    const formattedName = specieName.toLowerCase().replace(/\s+/g, '_') as SpeciesIconKey
    return speciesIcons[formattedName] || turtleIcon; 
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-4">
      {appointments &&
        appointments.map((app) => (
          <div
            key={app.patientId + app.appointmentDate}
            className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col h-full relative"
          >
            <div className="p-4 flex-grow">
              <h3 className="text-lg font-semibold">
                {dayjs(app.appointmentDate).format("MMM D, YYYY")}
              </h3>
              <p className="text-sm text-color_brand">
                Time: {dayjs(app.appointmentDate).format("h:mm A")}
              </p>
              <p className="text-sm">Veterinary: {app.vetName}</p>
              <p className="text-sm">Reason: {app.reason}</p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-semibold ${app.status === "Confirmed" ? "text-green-500" : "text-rose-600"
                    }`}
                >
                  {app.status}
                </span>
              </p>
              <p className="text-sm">Specie: {app.specieName}</p>
            </div>
            <div className="pb-4 flex space-x-2">

              <ButtonIcon
                text=""
                onClick={() => onEditAppointment(app.appointmentId || 0)}
                bgColor="bg-gray-100"
              >
                <EditIcon size={12} />
              </ButtonIcon>
              <ButtonIcon
                text=""
                onClick={() => onDeleteAppointment(app.appointmentId || 0)}
                bgColor="bg-rose-600"
                color="text-white"
              >
                <TrashIcon size={12} />
              </ButtonIcon>

            </div>
            <div className="absolute bottom-0 right-0 p-2">
              <img
                src={getSpeciesIcon(app.specieName || 'unknown').src}
                alt={`${app.specieName} icon`}
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default CalendarGrid;