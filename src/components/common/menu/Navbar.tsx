import { useState } from "react";
import {
  Menu,
  CalendarDays,
  BriefcaseMedical,
  Warehouse,
  Receipt,
  MonitorCog,
} from "lucide-react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <nav className="relative mr-10">
      <button
        className="lg:hidden flex items-center px-4 py-3 text-color_brand hover:text-gray-800"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <Menu size={28} />
      </button>

      <div
        className={`absolute lg:static top-16 -left-8 lg:w-auto bg-white lg:bg-transparent flex flex-col lg:flex-row items-start lg:items-stretch gap-2 lg:gap-4 transition-all duration-300 ease-in-out z-50 min-w-52 ${
          menuOpen ? "block" : "hidden"
        } lg:flex`}
      >
        {[
          {
            href: "/modules/appointment/",
            label: "Appointments",
            icon: CalendarDays,
          },
          {
            href: "/modules/consult/",
            label: "Consults",
            icon: BriefcaseMedical,
          },
          {
            href: "/modules/inventory/",
            label: "Inventory",
            icon: Warehouse,
          },
          {
            href: "/modules/billing/",
            label: "Bills",
            icon: Receipt,
          },
          {
            href: "/modules/management/",
            label: "Management",
            icon: MonitorCog,
          },
        ].map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className="flex items-center text-color_brand hover:bg-slate-100 px-4 py-3 rounded-lg transition-colors"
          >
            <Icon size={32} className="text-color_brand" />
            <span className="pl-1 text-sm font-semibold text-color_brand">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
