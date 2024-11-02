
export interface ChartData {
    label: string;
    value: number;
}

export interface BarChartWidgetProps {
    data?: ChartData[];
    title?: string;
    color?: string;
    datasetLabel?: string;
}