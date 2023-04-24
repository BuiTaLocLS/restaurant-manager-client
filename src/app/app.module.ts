import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RoleComponent } from './components/role/role.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StatusComponent } from './components/status/status.component';
import { SizeComponent } from './components/size/size.component';
import { UnitComponent } from './components/unit/unit.component';
import { LocationComponent } from './components/location/location.component';
import { GuestTableComponent } from './components/guest-table/guest-table.component';
import { CategoryComponent } from './components/category/category.component';
import {OrganizationChartModule} from 'primeng/organizationchart';
import { FoodComponent } from './components/food/food.component';
import { ImageComponent } from './components/image/image.component';
import {CardModule} from 'primeng/card';
import { ItemComponent } from './components/item/item.component';
import { TableSetComponent } from './components/table-set/table-set.component';
import { OrderComponent } from './components/order/order.component';
import { ChipModule } from 'primeng/chip';
import { CardItemComponent } from './components/card-item/card-item.component';
import { CartComponent } from './components/cart/cart.component';
import { AccordionModule } from 'primeng/accordion';
import { PasswordModule } from 'primeng/password';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './components/login/login.component';
import {PanelModule} from 'primeng/panel';
import { ShellComponent } from './components/shell/shell.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    RestaurantComponent,
    RoleComponent,
    StatusComponent,
    SizeComponent,
    UnitComponent,
    LocationComponent,
    GuestTableComponent,
    CategoryComponent,
    FoodComponent,
    ImageComponent,
    ItemComponent,
    TableSetComponent,
    OrderComponent,
    CardItemComponent,
    CartComponent,
    LoginComponent,
    ShellComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    DropdownModule,
    OrganizationChartModule,
    CardModule,
    ChipModule,
    AccordionModule,

    PasswordModule,
    PanelModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService, ConfirmationService,{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
