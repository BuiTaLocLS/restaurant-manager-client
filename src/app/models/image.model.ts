import { Restaurant } from "./restaurant.model";
import { User } from "./user.model";

export interface Image {
    id: number;
    name: string;
    base64: string;
    description: string;
    created: Date;
    updated: Date;
    deleted: boolean;
    restaurant: Restaurant;
    createdUser: User;
    updatedUser: User;
}
