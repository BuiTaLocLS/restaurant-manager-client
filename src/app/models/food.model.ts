import { Restaurant } from "./restaurant.model";
import { User } from "./user.model";
import { Image } from "./image.model";
import { Category as Ca } from "./category.model";

export interface Food {
    id: number;
    name: string;
    description: string;
    created: Date;
    updated: Date;
    deleted: boolean;
    category: Ca;
    restaurant: Restaurant;
    createdUser: User;
    updatedUser: User;
    itemImage: Image;
    domSanitizer?: any;
}
