import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Item } from 'src/app/models/item.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardItemComponent implements OnInit {
  @Output() callOrder: EventEmitter<any> = new EventEmitter;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    console.log(this.item)
  }
  @Input() item: Item | undefined;

  order() {
    this.callOrder.emit(this.item);
  }

}
