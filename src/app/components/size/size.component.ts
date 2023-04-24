import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Size } from 'src/app/models/size.model';
import { Unit } from 'src/app/models/unit.model';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent {
  @Input() unitID: number | undefined = 0;
  isAddNew: boolean = false;
  sizeDialog: boolean = false;
  newSize = { ...this.dataService.newSize };
  sizes: Size[] = [];
  size: Size = Object.assign({}, this.newSize);
  submitted: boolean = true;
  loading: boolean = true;
  displaySizees: Size[] = [];


  units: Unit[] = [];
  selectedUnit: Unit = Object.assign(
    {},
    this.dataService.newUnit
  );

  //dropdonw
  restaurants: Restaurant[] = [];
  selectedRestaurant: Restaurant = Object.assign(
    {},
    this.dataService.newRestaurant
  );





  getAllUnits() {
    this.loading = true;
    this.dataService.getAllUnits().subscribe((data) => {
      this.units = data;

      this.loading = false;
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.getAllRestaurants();
    this.getAllUnits();
  }

  ngOnInit() {
    this.dataService.selectedRestaurant$.subscribe((r) => {
      this.selectedRestaurant = r;
    });
    if (!this.selectedRestaurant || this.selectedRestaurant.id === 0) {

      this.router.navigate(['/']);
    }
    this.getAllSizes();
  }


  getAllRestaurants() {
    this.loading = true;
    this.dataService.getAllRestaurants().subscribe((data) => {
      this.restaurants = data;
      this.loading = false;
    });
  }

  onChangeDropDown() {

  }

  getAllSizes() {
    this.loading = true;
    this.dataService.getAllSizes().subscribe((data) => {
      this.sizes = data;
      this.loading = false;
      this.displaySizees = [...this.sizes].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
      if (this.unitID !== 0) {

        this.displaySizees = this.displaySizees.filter((s) => s.unit.id === this.unitID);
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
    this.size = Object.assign({}, this.newSize);
    this.size.restaurant.id = this.selectedRestaurant.id;
    this.submitted = false;
    this.sizeDialog = true;
    this.isAddNew = true;
  }

  editSize(size: Size) {
    console.log(size.unit)
    console.log(this.units)
    this.size = { ...size };
    this.sizeDialog = true;
    this.selectedUnit = this.size.unit;
    this.isAddNew = false;
  }

  deleteSize(size: Size) {

    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa ' + size.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        size.deleted = true;
        this.dataService.putSize(size).subscribe((data) => {
          this.getAllSizes();
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
    this.sizeDialog = false;
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

  saveSize(): void {
    this.submitted = true;
    this.size.unit = this.selectedUnit;
    if (this.size.id === 0) {
      this.size.createdUser.id = this.dataService.loginUserId;





      this.dataService.postSize(this.size).subscribe(
        (data) => {
          if (data.success === true) {
            this.getAllSizes();
            this.hideDialog(false, true);
          }
        },
        (error) => {
          this.hideDialog(false, false);
        }
      );
    } else {



      this.size.updatedUser.id = this.dataService.loginUserId;
      this.dataService.putSize(this.size).subscribe(
        (data) => {
          if (data.success === true) {
            this.getAllSizes();
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
