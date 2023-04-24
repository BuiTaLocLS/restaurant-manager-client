import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Status } from 'src/app/models/status.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  isAddNew: boolean = false;
  statusDialog: boolean = false;
  newStatus = { ...this.dataService.newStatus };
  statuss: Status[] = [];
  status: Status = Object.assign({}, this.newStatus);
  submitted: boolean = true;
  loading: boolean = true;
  displayStatuses: Status[] = [];

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
    this.getAllStatuss();
  }

  getAllRestaurants() {
    this.loading = true;
    this.dataService.getAllRestaurants().subscribe((data) => {
      this.restaurants = data;
      this.loading = false;
    });
  }

  onChangeDropDown() {
    this.displayStatuses = [...this.statuss].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
  }

  getAllStatuss() {
    this.loading = true;
    this.dataService.getAllStatuss().subscribe((data) => {
      this.statuss = data;
      this.loading = false;
      this.displayStatuses = [...this.statuss].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
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
    this.status = Object.assign({}, this.newStatus);
    this.status.restaurant.id = this.selectedRestaurant.id;
    this.submitted = false;
    this.statusDialog = true;
    this.isAddNew = true;
  }

  editStatus(status: Status) {
    this.status = { ...status };
    this.statusDialog = true;
    this.isAddNew = false;
  }

  deleteStatus(status: Status) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa trạng thái ' + status.name + '?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        status.deleted = true;
        this.dataService.putStatus(status).subscribe((data) => {
          this.getAllStatuss();
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
    this.statusDialog = false;
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

  saveStatus(): void {
    this.submitted = true;
    if (this.status.id === 0) {
      this.status.createdUser.id = this.dataService.loginUserId;
      this.status.updatedUser.id = this.dataService.loginUserId;
      this.dataService.postStatus(this.status).subscribe(
        (data) => {
          if (data.success === true) {
            this.getAllStatuss();
            this.hideDialog(false, true);
          }
        },
        (error) => {
          console.log("🚀 ~ file: status.component.ts:155 ~ StatusComponent ~ saveStatus ~ error:", error)
          this.hideDialog(false, false);
        }
      );
    } else {
      this.dataService.putStatus(this.status).subscribe(
        (data) => {
          if (data.success === true) {
            this.getAllStatuss();
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
