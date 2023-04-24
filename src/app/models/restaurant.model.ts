import { User } from "./user.model";

export interface Restaurant {
    id: number;
    name: string;
    description: string;
    phone: string;
    address: string;
    created: Date;
    updated: Date;
    deleted: boolean;
    createdUser: User;
    updatedUser: User;
}
