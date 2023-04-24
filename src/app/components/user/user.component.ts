import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CreateUser } from 'src/app/models/createUser.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { UserModel } from 'src/app/models/usermodel.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
    isAddNew: boolean = false;
    userDialog: boolean = false;
    newUser = { ...this.dataService.newUserModel };
    users: UserModel[] = [];
    user: UserModel = Object.assign({}, this.newUser);
    submitted: boolean = true;
    loading: boolean = true;
    displayUseres: UserModel[] = [];
    roles: Role[] = [];
    selectedRole: Role = Object.assign({}, this.dataService.newRole);

    createDialog: boolean = false;
    createUser: CreateUser = {
      userName: '',
      displayName: '',
      password: '',
      email: '',
      roleId: 1,
      createdUserId: 1,
      updatedUserId: 1
    };

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
      this.getAllRole();
    };

    ngOnInit() {
      this.dataService.selectedRestaurant$.subscribe((r)=>{
        this.selectedRestaurant = r;
      });
      if(!this.selectedRestaurant || this.selectedRestaurant.id ===0){

        this.router.navigate(['/']);
      }
      this.getAllUsers();
    }

    getAllRole(){
      this.dataService.getAllRoles().subscribe(data => {
        this.roles = data;
        console.log('Role', data);
      })
    }

    getAllRestaurants() {
      this.loading = true;
      this.dataService.getAllRestaurants().subscribe((data) => {
        this.restaurants = data;
        this.loading = false;
      });
    }

    onChangeDropDown() {
      // this.displayUseres = [...this.users].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
    }

    getAllUsers() {
      this.loading = true;
      this.dataService.getAllUsers().subscribe((data) => {
        this.users = data;
        this.loading = false;
        // this.displayUseres = [...this.users].filter((s) => s.restaurant?.id === this.selectedRestaurant?.id);
        this.displayUseres = [...this.users]
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
      this.createUser = {
        userName: '',
        displayName: '',
        password: '',
        email: '',
        roleId: 1,
        createdUserId: 1,
        updatedUserId: 1
      };
      // this.user.restaurant.id = this.selectedRestaurant.id;
      this.submitted = false;
      this.createDialog  = true;
      this.isAddNew = true;

      console.log(this.createUser);

    }

    editUser(user: UserModel) {
      this.user = { ...user };
      this.userDialog = true;
      this.isAddNew = false;


      this.selectedRole = this.user.role;

      console.log("🚀 ~ file: user.component.ts:97 ~ UserComponent ~ openNew ~ this.selectedRole:", this.selectedRole)


      console.log("🚀 ~ file: user.component.ts:100 ~ UserComponent ~ openNew ~ this.roles:", this.roles)

    }

    deleteUser(user: UserModel) {
      this.confirmationService.confirm({
        message: 'Bạn có muốn xóa trạng thái ' + user.displayName + '?',
        header: 'Xác nhận',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          user.deleted = true;
          this.dataService.putUser(user).subscribe((data) => {
            this.getAllUsers();
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
      this.userDialog = false;
      this.createDialog = false;
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

    saveUser(): void {
      this.submitted = true;
      if (this.user.id === 0) {
        this.user.createdUserId = this.dataService.loginUserId;
        this.user.updatedUserId = this.dataService.loginUserId;
        this.dataService.postUser(this.createUser).subscribe(
          (data) => {
            if (data.success === true) {
              this.getAllUsers();
              this.hideDialog(false, true);
            }
          },
          (error) => {
            this.hideDialog(false, false);
          }
        );
      } else {
        this.dataService.putUser(this.user).subscribe(
          (data) => {
            if (data.success === true) {
              this.getAllUsers();
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
