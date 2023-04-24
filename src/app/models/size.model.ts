import { Restaurant } from "./restaurant.model";
import { Unit } from "./unit.model";
import { User } from "./user.model";

export interface Size {
    id: number;
    name: string;
    description: string;
    created: Date;
    updated: Date;
    deleted: boolean;
    restaurant: Restaurant;
    createdUser: User;
    updatedUser: User;
    unit: Unit;
}
