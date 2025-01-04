import {
  PawPrint,
  HospitalIcon,
  Users,
  Link,
  CalendarIcon
} from 'lucide-react';

const QuickActionsWidget = () => {
  const actions = [
    {
      icon: <Users className="text-rose-600" size={24} />,
      title: "Owners",
      description: "Customer management",
      link: "/modules/owner"
    },
    {
      icon: <PawPrint className="text-rose-600" size={24} />,
      title: "Patients",
      description: "Animal management",
      link: "/modules/patient"
    },
    {
      icon: <CalendarIcon className="text-rose-600" size={24} />,
      title: "Appointments",
      description: "Customer appointment management",
      link: "/modules/appointment"
    },
    {
      icon: <HospitalIcon className="text-rose-600" size={24} />,
      title: "Inventory",
      description: "Product stock management",
      link: "/modules/inventory"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-md p-6 border border-gray-200 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-color_brand">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action, index) => (
          <a
            key={index}
            href={action.link}
            className="flex items-center space-x-3 p-4 bg-white shadow transition group hover:shadow-lg hover:scale-105 hover:bg-gray-50"
          >
            <div className="bg-rose-100 p-3 rounded-full">
              {action.icon}
            </div>
            <div className="text-left">
              <p className="font-semibold text-color_brand group-hover:text-rose-600 transition text-sm">
                {action.title}
              </p>
              <p className="text-color_brand group-hover:text-gray-800 text-xs">
                {action.description}
              </p>
            </div>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition">
              <Link size={20} className="text-color_brand group-hover:text-rose-600" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsWidget;
