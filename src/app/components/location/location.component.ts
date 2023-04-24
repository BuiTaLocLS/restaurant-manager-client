import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Locationn } from 'src/app/models/location.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
    isAddNew: boolean = false;
    locationDialog: boolean = false;
    newLocation = { ...this.dataService.newLocation };
    locations: Locationn[] = [];
    location: Locationn = Object.assign({}, this.newLocation);
    submitted: boolean = true;
    loading: boolean = true;
    displayLocationes: Locationn[] = [];

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
      this.getAllLocations();
    }

    getAllRestaurants() {
      this.loading = true;
      this.dataService.getAllRestaurants().subscribe((data) => {
        this.restaurants = data;
        this.loading = false;
      });
    }

    onChangeDropDown() {
      this.displayLocationes = [...this.locations].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
    }

    getAllLocations() {
      this.loading = true;
      this.dataService.getAllLocations().subscribe((data) => {
        this.locations = data;
        this.loading = false;
        this.displayLocationes = [...this.locations].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
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
      this.location = Object.assign({}, this.newLocation);
      this.location.restaurant.id = this.selectedRestaurant.id;
      this.submitted = false;
      this.locationDialog = true;
      this.isAddNew = true;
    }

    editLocation(location: Locationn) {
      this.location = { ...location };
      this.locationDialog = true;
      this.isAddNew = false;
    }

    deleteLocation(location: Locationn) {
      this.confirmationService.confirm({
        message: 'Bạn có muốn xóa ' + location.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          location.deleted = true;
          this.dataService.putLocation(location).subscribe((data) => {
            this.getAllLocations();
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
      this.locationDialog = false;
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

    saveLocation(): void {
      this.submitted = true;
      if (this.location.id === 0) {
        console.log(this.dataService.getLoginUserId());
        this.location.createdUser.id = this.dataService.getLoginUserId();
        this.location.updatedUser.id = this.dataService.getLoginUserId();
        this.dataService.postLocation(this.location).subscribe(
          (data) => {
            if (data.success === true) {
              this.getAllLocations();
              this.hideDialog(false, true);
            }
          },
          (error) => {
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService.putLocation(this.location).subscribe(
          (data) => {
            if (data.success === true) {
              this.getAllLocations();
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
