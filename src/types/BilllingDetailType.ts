import type { Consult } from "./ConsultType";
import type { Inventory } from "./InventoryType";

export interface BillingDetail {
  inventory?: Inventory;
  consultation?: Consult;
  name: string;
  description: string;
  quantity: number;
  amount: number;
}