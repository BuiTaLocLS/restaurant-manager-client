import { Restaurant } from "./restaurant.model";
import { User } from "./user.model";

export interface Status {
    id: number;
    name: string;
    description: string;
    created: Date;
    updated: Date;
    deleted: boolean;
    restaurant: Restaurant;
    createdUser: User;
    updatedUser: User;
}
