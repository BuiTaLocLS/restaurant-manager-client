import { Role } from "./role.model";
import { User } from "./user.model";

export interface UserModel {
    id: number;
    userName: string;
    displayName: string;
    email: string;
    description: string;
    created: string;
    updated: string;
    deleted: boolean;
    offDuty: boolean;
    roleId: number;
    role: Role;
    createdUserId: number;
    updatedUserId: number;
    createdUser: User[];
    updatedUser: User[];
}
