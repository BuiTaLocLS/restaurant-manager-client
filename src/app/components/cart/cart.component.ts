import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { count } from 'rxjs';
import { GuestTable } from 'src/app/models/guesttable.model';
import { Item } from 'src/app/models/item.model';
import { OrderItem } from 'src/app/models/orderItem.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  @Input() table: GuestTable | undefined;
  @Input() items: OrderItem[] = [];
  @Input() sum: number = 0;
  @Output() callOrderSuccess: EventEmitter<any> = new EventEmitter;

  submitted: boolean = true;
  loading: boolean = true;
  selectedRestaurant: Restaurant = { ...this.dataService.newRestaurant };
  sumPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {

  }
  ngOnInit(): void {
    this.dataService.selectedRestaurant$.subscribe((r) => {
      this.selectedRestaurant = r;
    });
    if (!this.selectedRestaurant || this.selectedRestaurant.id === 0) {
      this.router.navigate(['/']);
    }

  }


  idOrder: number = 0;

  pay() {
    this.submitted = true;

    let newOrder = { ...this.dataService.newOrder };

    this.dataService.postOrder(newOrder).subscribe(
      (data) => {
        if (data.success === true) {
          let countSuccess = 0;
          this.idOrder = data.data.id;
          this.items.forEach(e => {
            e.order.id = this.idOrder;
            e.restaurant.id = this.selectedRestaurant.id;
            console.log(this.items);
            this.dataService.postOrderItem(e).subscribe(
              (data) => {
                countSuccess++;
                if(countSuccess == this.items.length){
                  this.callOrderSuccess.emit()
                }
              },
              (error) => {
              }
            );
          });
          console.log(
            countSuccess,this.items.length
            )
        }
      },
      (error) => {
        //
      }
    );
  }


}
