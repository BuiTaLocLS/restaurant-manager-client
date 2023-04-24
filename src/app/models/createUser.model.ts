import { Role } from "./role.model";
import { User } from "./user.model";

export interface CreateUser {
  userName: string,
  displayName: string,
  password: string,
  email: string,
  roleId: 1,
  createdUserId: 1,
  updatedUserId: 1
}
