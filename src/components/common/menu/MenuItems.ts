import catIcon from '../../../assets/icons/cat.png';
import companyIcon from '../../../assets/icons/company.png';
import vetIcon from '../../../assets/icons/vet.png';
import checklistIcon from '../../../assets/icons/checklist.png';
import billIcon from '../../../assets/icons/bill.png';

export const menuItems = [
  {
    name: 'Appointments',
    path: '/modules/appointment/',
    icon: catIcon,
    roleAccesibles: ["appointment"]
  },
  {
    name: 'Management',
    path: '/modules/management/',
    icon: companyIcon,
    roleAccesibles: ["owners","veterinary", "patients", "permissions", "roles", "employee"]
  },
  {
    name: 'Consults',
    path: '/modules/consult/',
    icon: vetIcon,
    roleAccesibles: ["consultations"]
  },
  {
    name: 'Inventory',
    path: '/modules/inventory/',
    icon: checklistIcon,
    roleAccesibles: ["inventory"]
  },
  {
    name: 'Bills',
    path: '/modules/billing/',
    icon: billIcon,
    roleAccesibles: ["billing"]
  }
];