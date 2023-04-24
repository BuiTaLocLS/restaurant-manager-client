import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ListOrderTable } from 'src/app/models/listOrderTable.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  restaurants: Restaurant[] = [];
  loading: boolean = false;
  selectedRestaurant: Restaurant = Object.assign(
    {},
    this.dataService.newRestaurant
  );

  constructor(
    private dataService: DataService,
  ) {
    this.getAllRestaurants();

    this.dataService.selectedRestaurant$.subscribe((r) => {
      this.selectedRestaurant = r;
    });
  }

  getAllGuestTables() {
    this.loading = true;
    this.dataService.getAllGuestTables().subscribe((data) => {
      data = [...data].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
      this.initListOrderEachTable(data);
      this.loading = false;
    });
  }

  initListOrderEachTable(guestTables: any[]) {
    this.dataService.listOrderEachTable = []
    guestTables.forEach((item) => {
      let a: ListOrderTable = {
        tableId: item.id,
        orders: []
      }
      this.dataService.listOrderEachTable.push(
        a
      )
    })

    console.log(this.dataService.listOrderEachTable);
  }

  getAllRestaurants() {
    this.loading = true;
    this.dataService.getAllRestaurants().subscribe((data) => {
      this.restaurants = data;
      this.loading = false;
    });
  }
  onChangeDropDown(): void {
    this.dataService.selectedRestaurant$.next(this.selectedRestaurant);
    console.log(this.selectedRestaurant);
    this.getAllGuestTables();
  }
}
