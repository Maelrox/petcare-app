import type { BillingDetail } from "./BilllingDetailType";
import type { Owner } from "./OwnerType";

export interface Billing {
  billingId: number;
  totalAmount: number;
  paymentStatus: string;
  transactionType: string;
  transactionDate: string;
  billingDetails: BillingDetail[];
  owner?: Owner;
  ownerId?: number;
  identification?: string;
  initialDate?: string;
  finalDate?: string;
}

export const billingFields: FormField<Billing>[] = [
  {
    name: "billingId",
    label: "Id",
    type: "none",
    required: true,
    includeFilter: true,
    filterName: "billingId"
  },
  {
    name: "paymentStatus",
    label: "Status",
    type: "none",
    required: true,
    includeFilter: true,
    filterName: "paymentStatus"
  },
  {
    name: "transactionDate",
    label: "Date",
    type: "datetime-local",
    required: true,
    includeFilter: false,
    filterName: "Date"
  },
  {
    name: "identification",
    label: "Identification",
    type: "text",
    required: true,
    displaySelect: "identification",
    includeFilter: true,
    filterName: "identification"
  },
  {
    name: "totalAmount",
    label: "Amount",
    type: "number",
    required: true,
    validators: { minValue: 1 },
  }
];
