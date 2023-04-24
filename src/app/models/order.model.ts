import { Restaurant } from "./restaurant.model";
import { OrderItem } from "./orderItem.model";

export interface Order {
    id?: number;
    orderNumber: string;
    description: string;
    created: Date;
    updated: Date;
    deleted: boolean;
    voided: boolean;
    totalPrice: number;
    paidAmount: number;
    restaurant: Restaurant;
}
