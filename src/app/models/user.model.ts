import { Role } from "./role.model";

export interface User {
    id: number;
    userName: string;
    description: string;
    created: Date;
    updated: Date;
    deleted: boolean;
    offDuty: boolean;
    createdUser: User[];
    updatedUser: User[];
}
