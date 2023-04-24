import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GuestTable } from 'src/app/models/guesttable.model';
import { Locationn } from 'src/app/models/location.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Status } from 'src/app/models/status.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-guest-table',
  templateUrl: './guest-table.component.html',
  styleUrls: ['./guest-table.component.scss']
})
export class GuestTableComponent {

    isAddNew: boolean = false;
    guestTableDialog: boolean = false;
    newGuestTable = { ...this.dataService.newGuestTable };
    guestTables: GuestTable[] = [];
    guestTable: GuestTable = Object.assign({}, this.newGuestTable);
    submitted: boolean = true;
    loading: boolean = true;
    displayGuestTablees: GuestTable[] = [];

    //dropdonw
    restaurants: Restaurant[] = [];
    selectedRestaurant: Restaurant = Object.assign(
      {},
      this.dataService.newRestaurant
    );

    statuss: Status[] = [];
    locations: Locationn[] = [];
    selectedStatus: Status = Object.assign(
      {},
      this.dataService.newStatus
    );

    selectedLocation: Status = Object.assign(
      {},
      this.dataService.newLocation
    );


    getAllStatuss() {
      this.loading = true;
      this.dataService.getAllStatuss().subscribe((data) => {
        this.statuss = data;
        this.loading = false;
      });
    }


    getAllLocations() {
      this.loading = true;
      this.dataService.getAllLocations().subscribe((data) => {
        this.locations = data;
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
      this.getAllStatuss();
      this.getAllLocations();
    }

    ngOnInit() {
      this.dataService.selectedRestaurant$.subscribe((r)=>{
        this.selectedRestaurant = r;
      });
      if(!this.selectedRestaurant || this.selectedRestaurant.id ===0){

        this.router.navigate(['/']);
      }
      this.getAllGuestTables();
    }


    getAllRestaurants() {
      this.loading = true;
      this.dataService.getAllRestaurants().subscribe((data) => {
        this.restaurants = data;
        this.loading = false;
      });
    }

    onChangeDropDown() {
      console.log(this.selectedStatus);
    }

    getAllGuestTables() {
      this.loading = true;
      this.dataService.getAllGuestTables().subscribe((data) => {
        this.guestTables = data;
        this.loading = false;
        this.displayGuestTablees = [...this.guestTables].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
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
      this.guestTable = Object.assign({}, this.newGuestTable);
      this.guestTable.restaurant.id = this.selectedRestaurant.id;
      this.submitted = false;
      this.guestTableDialog = true;
      this.isAddNew = true;
    }

    editGuestTable(guestTable: GuestTable) {
      this.guestTable = { ...guestTable };
      this.selectedLocation = this.guestTable.location;
      this.selectedStatus= this.guestTable.status;
      this.guestTableDialog = true;
      this.isAddNew = false;

      console.log(this.selectedLocation);
      console.log(this.locations);

    }

    deleteGuestTable(guestTable: GuestTable) {
      console.log('delete');
      this.confirmationService.confirm({
        message: 'Bạn có muốn xóa ' + guestTable.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          guestTable.deleted = true;
          this.dataService.putGuestTable(guestTable).subscribe((data) => {
            this.getAllGuestTables();
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
      this.guestTableDialog = false;
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

    saveGuestTable(): void {
      this.guestTable.status = this.selectedStatus;
      this.guestTable.location = this.selectedLocation;
      this.submitted = true;
      if (this.guestTable.id === 0) {
        this.guestTable.createdUser.id = this.dataService.loginUserId;
        this.dataService.postGuestTable(this.guestTable).subscribe(
          (data) => {
            if (data.success === true) {
              this.getAllGuestTables();
              this.hideDialog(false, true);
            }
          },
          (error) => {
            this.hideDialog(false, false);
          }
        );
      } else {
        this.guestTable.updatedUser.id = this.dataService.loginUserId;
        this.dataService.putGuestTable(this.guestTable).subscribe(
          (data) => {
            if (data.success === true) {
              this.getAllGuestTables();
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
