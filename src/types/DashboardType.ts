import type { Company } from "./CompanyType";

export interface CompanyResume {
  totalCustomers: number;
  customersTrend: {
    percentage: number;
    period: string;
  };
  totalAttentions: number;
  attentionsTrend: {
    percentage: number;
    period: string;
  };
  inventorySales: {
    amount: number;
    currency: string;
  };
  inventoryTrend: {
    percentage: number;
  };
  todayAppointments: number;
  todayAppointmentsTrend: {
    percentage: number;
    period: string;
  };
  chartData: ChartData[];
  hotMetric: Hotmetric;
  company: Company;
  employeeResume: EmployeeResume;
  serviceResume: ServiceResume;
  attentionResume: AttentionResume[];
  productResume: ProductResume[];
}

export interface ChartData {
  label: string;
  value: number;
}

export interface Hotmetric {
  peakHours: string;
  highTraffic: number;
  consultations: number;
}

export interface EmployeeResume {
  mapTotals: { [key: string]: number };
}

export interface ServiceResume {
  mapTotals: string[];
}

export interface AttentionResume {
  date: string;
  quantity: number;
}

export interface ProductResume {
  name: string;
  quantity: number;
}