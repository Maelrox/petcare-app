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
  hotMetric: Hotmetric
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