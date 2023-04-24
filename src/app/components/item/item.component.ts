import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Item } from 'src/app/models/item.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit{

    isAddNew: boolean = false;
    itemDialog: boolean = false;
    newItem = { ...this.dataService.newItem };
    items: Item[] = [];
    item: Item = Object.assign({}, this.newItem);
    submitted: boolean = true;
    loading: boolean = true;
    displayItemes: Item[] = [];

    //dropdonw
    restaurants: Restaurant[] = [];
    selectedRestaurant: Restaurant = Object.assign(
      {},
      this.dataService.newRestaurant
    );

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private dataService: DataService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService
    ) {
      this.getAllRestaurants();
    }

    ngOnInit() {
      this.dataService.selectedRestaurant$.subscribe((r)=>{
        this.selectedRestaurant = r;
      });
      if(!this.selectedRestaurant || this.selectedRestaurant.id ===0){

        this.router.navigate(['/']);
      }
      this.getAllItems();
    }

    getAllRestaurants() {
      this.loading = true;
      this.dataService.getAllRestaurants().subscribe((data) => {
        this.restaurants = data;
        this.loading = false;
      });
    }

    onChangeDropDown() {
      this.displayItemes = [...this.items].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
    }

    getAllItems() {
      this.loading = true;
      this.dataService.getAllItems().subscribe((data) => {
        this.items = data;
        this.loading = false;
        this.displayItemes = [...this.items].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
      });
    }

    openNew() {
      if (this.selectedRestaurant.id === 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: `Vui lòng chọn nhà hàng`,
          life: 3000,
        });
      }
      this.item = Object.assign({}, this.newItem);
      this.item.restaurant.id = this.selectedRestaurant.id;
      this.submitted = false;
      this.itemDialog = true;
      this.isAddNew = true;
    }

    editItem(item: Item) {
      this.item = { ...item };
      this.itemDialog = true;
      this.isAddNew = false;
    }

    deleteItem(item: Item) {
      this.confirmationService.confirm({
        message: 'Bạn có muốn xóa ' + item.restaurant.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          item.deleted = true;
          this.dataService.putItem(item).subscribe((data) => {
            this.getAllItems();
          });
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Đã xóa thành công',
            life: 3000,
          });
        },
      });
    }

    hideDialog(cancel = true, success = true): void {
      let string = this.isAddNew ? 'Thêm mới' : 'Chỉnh sửa';
      this.itemDialog = false;
      if (cancel) {
        this.messageService.add({
          severity: 'info',
          summary: 'Huỷ',
          detail: `Đã hủy ${string}`,
          life: 3000,
        });
      } else if (success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: `${string} tình trạng thành công`,
          life: 3000,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: `${string} tình trạng bị lỗi`,
          life: 3000,
        });
      }
      this.submitted = false;
    }

    saveItem(): void {
      console.log(this.item);
      this.submitted = true;
      if (this.item.id === 0) {
        this.item.createdUser.id = this.dataService.loginUserId;
        this.item.updatedUser.id = this.dataService.loginUserId;
        this.dataService.postItem(this.item).subscribe(
          (data) => {
            if (data.success === true) {
              this.getAllItems();
              this.hideDialog(false, true);
            }
          },
          (error) => {
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService.putItem(this.item).subscribe(
          (data) => {
            if (data.success === true) {
              this.getAllItems();
              this.hideDialog(false, true);
            }
          },
          (error) => {
            this.hideDialog(false, false);
          }
        );
      }
    }



}
