
export interface ChartData {
    label: string;
    value: number;
}

export interface BarChartWidgetProps {
    data?: Array<{
      label: string;
      value: number;
    }>;
    title?: string;
    color?: string;
    datasetLabel?: string;
    labelColor?: string;
    backgroundColor?: string;
  }