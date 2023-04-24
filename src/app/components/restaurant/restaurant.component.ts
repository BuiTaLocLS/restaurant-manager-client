import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Restaurant } from 'src/app/models/restaurant.model';
import { DataService } from 'src/app/services/data.service';
import { ExportService } from 'src/app/services/export.service';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent {
  isAddNew: boolean = false;

  restaurantDialog: boolean = false;

  newRestaurant = { ...this.dataService.newRestaurant };

  restaurants: Restaurant[] = [];

  restaurant: Restaurant = Object.assign({}, this.newRestaurant);

  submitted: boolean = true;
  loading: boolean = true;


  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private exportService: ExportService
  ) {

  }

  ngOnInit() {
    this.getAllRestaurants();
  }

  isNullOrUndefined(param: any): boolean {
    if (param === null || param === undefined) {
      return true;
    }
    return false;
  }

  // makeEmptyForNullName(array: any[]){
  //   array.forEach(item=>{
  //     console.log('name');
  //     console.log(item);

  //     console.log(item['updatedUser']['userName'])
  //     if(this.isNullOrUndefined(item['updatedUser']['userName'])){
  //       item['updatedUser']['userName'] = ''
  //     }
  //     if(this.isNullOrUndefined(item['createdUser']['userName'])){
  //       item['createdUser']['userName'] = ''
  //     }
  //   })
  // }

  getAllRestaurants() {
    this.loading = true;
    this.dataService.getAllRestaurants().subscribe(data => {
      this.restaurants = data;
      // this.makeEmptyForNullName(this.restaurants);
      console.log('res:', data);
      this.loading = false;
    });
  }

  openNew() {
    this.restaurant = Object.assign({}, this.newRestaurant);
    this.submitted = false;
    this.restaurantDialog = true;
    this.isAddNew = true;
  }


  editRestaurant(restaurant: Restaurant) {
    this.restaurant = { ...restaurant };
    this.restaurantDialog = true;
    this.isAddNew = false;
  }

  deleteRestaurant(restaurant: Restaurant) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa nhà hàng ' + restaurant.name + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        restaurant.deleted = true;
        this.dataService.putRestaurant(restaurant).subscribe(data => {
          console.log('Xoa xong', data);
          this.getAllRestaurants();
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Đã xóa nhà hàng thành công', life: 3000 });
      }
    });
  }

  hideDialog(cancel = true, success = true): void {
    let string = this.isAddNew ? 'Thêm mới' : 'Chỉnh sửa';
    this.restaurantDialog = false;
    console.log(string);
    if (cancel) {
      this.messageService.add({
        severity: 'info', summary: 'Huỷ', detail: `Đã hủy ${string}`, life: 3000
      })
    } else if (success) {
      this.messageService.add({
        severity: 'success', summary: 'Thành công', detail: `${string} nhà hàng thành công`, life: 3000
      })
    } else {
      this.messageService.add({
        severity: 'error', summary: 'Lỗi', detail: `${string} nhà bị lỗi`, life: 3000
      })
    }
    this.submitted = false;
  }

  saveRestaurant(): void {
    console.log('saveRestaurant', this.restaurant);
    this.submitted = true;
    if (this.restaurant.id === 0) {
      this.restaurant.createdUser.id = this.dataService.loginUserId;
      this.restaurant.updatedUser.id = this.dataService.loginUserId;
      console.log('id = 0');
      this.dataService.postRestaurant(this.restaurant).subscribe(
        (data) => {
          if (data.success === true) {
            this.getAllRestaurants();
            this.hideDialog(false, true);
            console.log(this.restaurant);
          }
        },
        (error) => {
          this.hideDialog(false, false);
        }
      )
    } else {
      this.dataService.putRestaurant(this.restaurant).subscribe(
        (data) => {
          if (data.success === true) {
            this.getAllRestaurants();
            this.hideDialog(false, true);
          }
        },
        (error) => {
          this.hideDialog(false, false);
        }
      )
    }
  }


  exportExcel() {
   this.exportService.exportExcel(this.restaurants,"restaurants");
  }

}
