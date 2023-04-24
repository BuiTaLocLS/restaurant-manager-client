import { OrderItem } from "./orderItem.model";

export interface ListOrderTable {
  tableId: number,
  orders: OrderItem[],
}
