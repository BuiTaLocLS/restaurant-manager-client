import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Category } from 'src/app/models/category.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

    isAddNew: boolean = false;
    categoryDialog: boolean = false;
    newCategory = { ...this.dataService.newCategory };
    categorys: Category[] = [];
    category: Category = Object.assign({}, this.newCategory);
    submitted: boolean = true;
    loading: boolean = true;
    displayCategoryes: Category[] = [];

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
      this.getAllCategorys();
    }

    getAllRestaurants() {
      this.loading = true;
      this.dataService.getAllRestaurants().subscribe((data) => {
        this.restaurants = data;
        this.loading = false;
      });
    }

    onChangeDropDown() {
      this.displayCategoryes = [...this.categorys].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
    }

    getAllCategorys() {
      this.loading = true;
      this.dataService.getAllCategorys().subscribe((data) => {
        this.categorys = data;
        this.loading = false;
        this.displayCategoryes = [...this.categorys].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
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
      this.category = Object.assign({}, this.newCategory);
      this.category.restaurant.id = this.selectedRestaurant.id;
      this.submitted = false;
      this.categoryDialog = true;
      this.isAddNew = true;
    }

    editCategory(category: Category) {
      this.category = { ...category };
      this.categoryDialog = true;
      this.isAddNew = false;
    }

    deleteCategory(category: Category) {
      this.confirmationService.confirm({
        message: 'Bạn có muốn xóa ' + category.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          category.deleted = true;
          this.dataService.putCategory(category).subscribe((data) => {
            this.getAllCategorys();
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
      this.categoryDialog = false;
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

    saveCategory(): void {
      this.submitted = true;
      if (this.category.id === 0) {
        this.category.createdUser.id = this.dataService.loginUserId;
        this.category.updatedUser.id = this.dataService.loginUserId;
        this.dataService.postCategory(this.category).subscribe(
          (data) => {
            if (data.success === true) {
              this.getAllCategorys();
              this.hideDialog(false, true);
            }
          },
          (error) => {
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService.putCategory(this.category).subscribe(
          (data) => {
            if (data.success === true) {
              this.getAllCategorys();
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
