import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Category } from 'src/app/models/category.model';
import { Food } from 'src/app/models/food.model';
import { GuestTable } from 'src/app/models/guesttable.model';
import { Item } from 'src/app/models/item.model';
import { ListOrderTable } from 'src/app/models/listOrderTable.model';
import { OrderItem } from 'src/app/models/orderItem.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  isAddNew: boolean = false;
  guestTableDialog: boolean = false;
  newGuestTable = { ...this.dataService.newGuestTable };
  guestTables: GuestTable[] = [];
  guestTable: GuestTable = Object.assign({}, this.newGuestTable);

  selectedGuestTable: GuestTable | undefined;

  isSelectTable: boolean = false;

  selectedCategory: Category | undefined

  submitted: boolean = true;
  loading: boolean = true;
  displayGuestTablees: GuestTable[] = [];
  categorys: Category[] = [];
  category: Category = Object.assign({}, this.dataService.newCategory);

  foods: Food[] = [];
  items: Item[] = [];
  //dropdonw
  restaurants: Restaurant[] = [];
  selectedRestaurant: Restaurant = Object.assign(
    {},
    this.dataService.newRestaurant
  );

  getAllGuestTables() {
    this.loading = true;
    this.dataService.getAllGuestTables().subscribe((data) => {
      this.guestTables = data;
      this.loading = false;
      this.displayGuestTablees = [...this.guestTables].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
    });
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private domSanitizer: DomSanitizer
  ) {
    this.getAllRestaurants();
  }

  isViewCart: boolean = false;

  ngOnInit(): void {
    this.dataService.selectedRestaurant$.subscribe((r) => {
      this.selectedRestaurant = r;
    });
    if (!this.selectedRestaurant || this.selectedRestaurant.id === 0) {

      this.router.navigate(['/']);
    }
    this.getAllGuestTables();

    this.getAllCategorys();
    this.getAllItems();
    this.getAllFoods();

  }


  getAllRestaurants() {
    this.loading = true;
    this.dataService.getAllRestaurants().subscribe((data) => {
      this.restaurants = data;
      this.loading = false;
    });
  }

  index = -1;
  orderForTable(guestTable: GuestTable) {
    this.selectedGuestTable = guestTable;
    this.isSelectTable = true;
    console.log(this.dataService.listOrderEachTable)
    this.index = this.dataService.listOrderEachTable.findIndex(x => x['tableId'] === this.selectedGuestTable?.id);
    console.log(this.index);


    this.orderItems = [...this.dataService.listOrderEachTable[this.index].orders];

    console.log(this.orderItems);

  }

  sum: number = 0;
  getAllCategorys() {
    this.loading = true;
    this.dataService.getAllCategorys().subscribe((data) => {
      this.categorys = data;
      this.loading = false;
      this.categorys = [...this.categorys].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
    });
  }

  getAllFoods() {
    this.loading = true;
    this.dataService.getAllFoods().subscribe((data) => {
      this.foods = data;
      this.loading = false;
      this.foods = [...this.foods].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
    });
  }

  getAllItems() {
    this.loading = true;
    this.dataService.getAllItems().subscribe((data) => {
      this.items = data;
      this.loading = false;
      this.items = [...this.items].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);

      this.items.forEach(i => {
        let imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl(
          'data:image/jpg;base64,' + i.food.itemImage?.base64
        )
        i.food.domSanitizer = imagePath;
      });
      this.selectedItems = [...this.items];
    });


  }

  selectedItems: Item[] = [];
  onSelectChip(item: Category) {
    this.selectedCategory = item;

    this.selectedItems = [...this.items].filter((s) => s.food.category?.id === item?.id);
  }

  removeSelectChip() {
    this.selectedItems = [...this.items];
  }

  backToTable(){
    this.isSelectTable = false;
    this.dataService.listOrderEachTable[this.index].orders =  [...this.orderItems];
  }

  orderItems: OrderItem[] = [];



  callOrderSuccess(){
    this.selectedGuestTable = undefined;
    this.isSelectTable = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Thanh toán thành công',
      life: 3000,
    });
    this.orderItems = [];
    this.sum = 0;
    this.dataService.listOrderEachTable[this.index].orders = []
  }

  order(item: Item) {
    this.sum = 0;
    let index  = -1;

    if(this.orderItems.length > 0){
      index =  this.orderItems.findIndex(el => el.item.id === item.id);
    }


    if (index !== -1){
      this.orderItems[index].quantity++;
    } else {
      let newOrderItem = Object.assign({}, this.dataService.newOderItem);
      newOrderItem.item = item;
      newOrderItem.name = item.food.name;
      newOrderItem.salePrice = item.price;
      newOrderItem.quantity = 1;
      this.orderItems = [...this.orderItems,newOrderItem];
    }

    this.orderItems.forEach(e=>{
        this.sum = this.sum + e.quantity*e.salePrice;
      })
  }
}
