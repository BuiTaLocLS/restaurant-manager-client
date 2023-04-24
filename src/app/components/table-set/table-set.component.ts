import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-set',
  templateUrl: './table-set.component.html',
  styleUrls: ['./table-set.component.scss']
})
export class TableSetComponent implements OnInit{
  constructor(){

  }

  @Input() name:string = '';

  ngOnInit(): void {

  }
}
