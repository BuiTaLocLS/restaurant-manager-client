import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Category } from 'src/app/models/category.model';
import { Food } from 'src/app/models/food.model';
import { Image } from 'src/app/models/image.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FoodComponent {
    @Input() categoryID: number | undefined = 0;
    isAddNew: boolean = false;
    foodDialog: boolean = false;
    imageDialog: boolean = false;
    newFood = { ...this.dataService.newFood };
    foods: Food[] = [];
    food: Food = Object.assign({}, this.newFood);
    submitted: boolean = true;
    loading: boolean = true;
    displayFoodes: Food[] = [];

    //dropdonw
    restaurants: Restaurant[] = [];
    selectedRestaurant: Restaurant = Object.assign(
      {},
      this.dataService.newRestaurant
    );

    categorys: Category[] = [];
    selectedCategory: Category = Object.assign(
      {},
      this.dataService.newCategory
    );


  public imagePathArr: any[] = [];

    getAllCategorys() {
      this.loading = true;
      this.dataService.getAllCategorys().subscribe((data) => {
        this.categorys = data;
        this.loading = false;
      });
    }

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private dataService: DataService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private domSanitizer: DomSanitizer,
    ) {
      this.getAllRestaurants();
      this.getAllCategorys();
    }

    ngOnInit() {
      this.dataService.selectedRestaurant$.subscribe((r) => {
        this.selectedRestaurant = r;
      });
      if (!this.selectedRestaurant || this.selectedRestaurant.id === 0) {

        this.router.navigate(['/']);
      }
      this.getAllFoods();
    }


    getAllRestaurants() {
      this.loading = true;
      this.dataService.getAllRestaurants().subscribe((data) => {
        this.restaurants = data;
        this.loading = false;
      });
    }

    onChangeDropDown() {
      console.log(this.selectedCategory);
    }

    getAllImages() {
      this.imagePathArr = [];
      this.dataService.getAllImages(this.selectedRestaurant.id).subscribe((data) => {
        console.log('data = ', data);
        data.forEach(i => {
          let imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl(
            'data:image/jpg;base64,' + i.base64
          )
          let name = i.name;
          let id = i.id;
          this.imagePathArr = [...this.imagePathArr, {
            name: name,
            imagePath: imagePath,
            id: id
          }]
        });
        this.loading = false;
      })
    }

    getAllFoods() {
      this.loading = true;
      this.dataService.getAllFoods().subscribe((data) => {
        this.foods = data;

        this.foods.forEach(i => {
          console.log(i.itemImage);
          let imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl(
            'data:image/jpg;base64,' + i.itemImage?.base64
          )
            i.domSanitizer = imagePath;
        });

        console.log(this.foods);

        this.loading = false;
        this.displayFoodes = [...this.foods].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
        if (this.categoryID !== 0) {
          console.log('vao if');
          this.displayFoodes = this.displayFoodes.filter((s) => s.category.id === this.categoryID);
        }
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
      this.food = Object.assign({}, this.newFood);
      this.food.restaurant.id = this.selectedRestaurant.id;
      this.submitted = false;
      this.foodDialog = true;
      this.isAddNew = true;
    }

    editFood(food: Food) {
      this.food = { ...food };
      this.foodDialog = true;
      this.selectedCategory = this.food.category;
      this.isAddNew = false;
      this.label = food.itemImage.name;
    }

    openImageDialog(){
      this.imageDialog = true;
      this.getAllImages();
    }

    label: string = "Chọn ảnh";

    selectIMG(item:Image){
      this.food.itemImage = item;
      this.food.itemImage.id = item.id;
      this.imageDialog = false;
      console.log(this.food);
      this.label = item.name;
    }

    deleteFood(food: Food) {
      console.log('delete');
      this.confirmationService.confirm({
        message: 'Bạn có muốn xóa ' + food.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          food.deleted = true;
          this.dataService.putFood(food).subscribe((data) => {
            this.getAllFoods();
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
      this.foodDialog = false;
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

    saveFood(): void {
      console.log("SaveFood");
      console.log(this.food);
      this.submitted = true;
      this.food.category = this.selectedCategory;
      if (this.food.id === 0) {
        this.food.createdUser.id = this.dataService.loginUserId;
        this.food.updatedUser.id = this.dataService.loginUserId;
        this.dataService.postFood(this.food).subscribe(
          (data) => {
            if (data.success === true) {
              this.getAllFoods();
              this.hideDialog(false, true);
            }
          },
          (error) => {
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService.putFood(this.food).subscribe(
          (data) => {
            if (data.success === true) {
              this.getAllFoods();
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
