import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CategoryComponent } from './components/category/category.component';
import { FoodComponent } from './components/food/food.component';
import { GuestTableComponent } from './components/guest-table/guest-table.component';
import { HomeComponent } from './components/home/home.component';
import { ImageComponent } from './components/image/image.component';
import { ItemComponent } from './components/item/item.component';
import { LocationComponent } from './components/location/location.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RoleComponent } from './components/role/role.component';
import { ShellComponent } from './components/shell/shell.component';
import { SizeComponent } from './components/size/size.component';
import { StatusComponent } from './components/status/status.component';
import { UnitComponent } from './components/unit/unit.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { register: true } },
  { path: '', component: ShellComponent,canActivate: [AuthGuard], children: [
    { path: '', component: HomeComponent, },
    { path: 'restaurant', component: RestaurantComponent, canActivate: [AuthGuard] },
    { path: 'role', component: RoleComponent, canActivate: [AuthGuard] },
    { path: 'status', component: StatusComponent, canActivate: [AuthGuard] },
    { path: 'unit', component: UnitComponent, canActivate: [AuthGuard] },
    { path: 'size', component: SizeComponent, canActivate: [AuthGuard] },
    { path: 'location', component: LocationComponent, canActivate: [AuthGuard] },
    { path: 'guesttable', component: GuestTableComponent, canActivate: [AuthGuard] },
    { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
    { path: 'food', component: FoodComponent, canActivate: [AuthGuard] },
    { path: 'image', component: ImageComponent, canActivate: [AuthGuard] },
    { path: 'item', component: ItemComponent, canActivate: [AuthGuard] },
    { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  ]
},

  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
