import { Food } from "./food.model";
import { Restaurant } from "./restaurant.model";
import { Size } from "./size.model";
import { User } from "./user.model";

export interface Item {
    id: number;
    food: Food;
    size: Size;
    description: string;
    price: number;
    discount: number;
    quantity: number;
    created: Date;
    updated: Date;
    deleted: boolean;
    restaurant: Restaurant;
    createdUser: User;
    updatedUser: User;
}
