import type { BillingDetail } from "./BilllingDetailType";
import type { Owner } from "./OwnerType";

export interface Billing {
    billingId: number;
    totalAmount: number;
    paymentStatus: string;
    transactionType: string;
    transactionDate: string;
    billingDetails: BillingDetail[],
    owner?: Owner,
    ownerId?: number;
  }