import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Restaurant } from 'src/app/models/restaurant.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class ShellComponent {
  title = 'Quản lý nhà hàng - Admin';
  items: MenuItem[] = [];
  selectedRestaurant: Restaurant = Object.assign({}, this.dataService.newRestaurant);
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private authService: AuthService
  ) {
    console.log(this.router.url)
   }


   isAdminPolicy():boolean{
    return this.authService.getRole() === "Admin"
   }

   isManagerPolicy():boolean{
    return this.authService.getRole() === "Manager" || this.authService.getRole() === "Admin"
   }



  ngOnInit() {
    this.items = [
      {
        label: 'Trang chủ',
        icon: 'pi pi-fw pi-desktop',
        command: () => this.router.navigate(['']),
      },
      {
        label: 'Nhà hàng',
        icon: 'pi pi-fw pi-home',
        command: () => this.router.navigate(['/restaurant']),
        visible: this.isAdminPolicy(),
      },
      {
        label: 'Nhân sự',
        icon: 'pi pi-fw pi-user',
        command: () => this.router.navigate(['/user']),
        visible: this.isManagerPolicy(),
      },
      {
        label: 'Bảng chung',
        icon: 'pi pi-fw pi-mobile',
        items: [
          {
            label: 'Tình trạng',
            icon: 'pi pi-fw pi-flag',
            command: () => this.router.navigate(['/status']),
            visible: this.isManagerPolicy(),
          },
          {
            label: 'Khu vực',
            icon: 'pi pi-fw pi-share-alt',
            command: () => this.router.navigate(['/location']),
            visible: this.isManagerPolicy(),
          },
          {
            label: 'Đơn vị',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Đơn vị',
                command: () => this.router.navigate(['/unit']),
              },
              {
                label: 'Kích thước',
                command: () => this.router.navigate(['/size']),
              },

            ],
          },
          {
            label: 'Thể loại',
            icon: 'pi pi-fw pi-palette',
            command: () => this.router.navigate(['/category']),
            visible: this.isManagerPolicy(),
          },
        ],
      },
      {
        label: 'Bàn ăn',
        icon: 'pi pi-fw pi-table',
        command: () => this.router.navigate(['/guesttable']),
      },
      {
        label: 'Thức ăn',
        icon: 'pi pi-fw pi-calendar',
        command: () => this.router.navigate(['/food']),
        visible: this.isManagerPolicy(),
      },
      {
        label: 'Hình ảnh',
        icon: 'pi pi-fw pi-images',
        command: () => this.router.navigate(['/image']),
        visible: this.isManagerPolicy(),
      },
      {
        label: 'Chi tiết sản phẩm',
        icon: 'pi pi-fw pi-ticket',
        command: () => this.router.navigate(['/item']),
      },
      {
        label: 'Đặt thức ăn',
        icon: 'pi pi-fw pi-ticket',
        command: () => this.router.navigate(['/order']),
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.authService.logout();
          this.router.navigate(['/login']);
        },
      },
    ];
    this.dataService.selectedRestaurant$.subscribe((r) => {
      this.selectedRestaurant = r;
      console.log('this.selectedRestaurant');
      console.log(this.selectedRestaurant);
    })
  }

  isLoggedIn() { return this.authService.isLoggedIn() }

  getUsername(){
    return this.authService.getUsername();
  }
}
