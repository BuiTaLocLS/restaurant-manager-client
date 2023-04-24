import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Unit } from 'src/app/models/unit.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent {
    isAddNew: boolean = false;
    unitDialog: boolean = false;
    newUnit = { ...this.dataService.newUnit };
    units: Unit[] = [];
    unit: Unit = Object.assign({}, this.newUnit);
    submitted: boolean = true;
    loading: boolean = true;
    displayUnites: Unit[] = [];

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
      this.getAllUnits();
    }

    getAllRestaurants() {
      this.loading = true;
      this.dataService.getAllRestaurants().subscribe((data) => {
        this.restaurants = data;
        this.loading = false;
      });
    }

    onChangeDropDown() {
      this.displayUnites = [...this.units].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
    }

    getAllUnits() {
      this.loading = true;
      this.dataService.getAllUnits().subscribe((data) => {
        this.units = data;
        this.loading = false;
        this.displayUnites = [...this.units].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
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
      this.unit = Object.assign({}, this.newUnit);
      this.unit.restaurant.id = this.selectedRestaurant.id;
      this.submitted = false;
      this.unitDialog = true;
      this.isAddNew = true;
    }

    editUnit(unit: Unit) {
      this.unit = { ...unit };
      this.unitDialog = true;
      this.isAddNew = false;
    }

    deleteUnit(unit: Unit) {
      this.confirmationService.confirm({
        message: 'Bạn có muốn xóa ' + unit.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          unit.deleted = true;
          this.dataService.putUnit(unit).subscribe((data) => {
            this.getAllUnits();
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
      this.unitDialog = false;
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

    saveUnit(): void {
      this.submitted = true;
      if (this.unit.id === 0) {
        this.unit.createdUser.id = this.dataService.loginUserId;
        this.unit.updatedUser.id = this.dataService.loginUserId;
        this.dataService.postUnit(this.unit).subscribe(
          (data) => {
            if (data.success === true) {
              this.getAllUnits();
              this.hideDialog(false, true);
            }
          },
          (error) => {
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService.putUnit(this.unit).subscribe(
          (data) => {
            if (data.success === true) {
              this.getAllUnits();
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
