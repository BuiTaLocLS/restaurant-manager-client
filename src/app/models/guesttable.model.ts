import { Restaurant } from "./restaurant.model";
import { Status } from "./status.model";
import { User } from "./user.model";
import { Locationn } from "./location.model";
export interface GuestTable {
    id: number;
    name: string;
    description: string;
    created: Date;
    updated: Date;
    deleted: boolean;
    restaurant: Restaurant;
    createdUser: User;
    updatedUser: User;
    status: Status;
    location: Locationn;
}
