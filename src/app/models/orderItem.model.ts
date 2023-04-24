import { Item } from "./item.model";
import { Order } from "./order.model";
import { Restaurant } from "./restaurant.model";

export interface OrderItem {
    id: number;
    name: string;
    description: string;
    created: Date;
    updated: Date;
    deleted: boolean;
    voided: boolean;
    salePrice: number;
    item: Item;
    restaurant: Restaurant;
    order: Order;
    quantity: number;
}
