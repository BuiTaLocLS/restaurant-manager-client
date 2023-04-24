import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSetComponent } from './table-set.component';

describe('TableSetComponent', () => {
  let component: TableSetComponent;
  let fixture: ComponentFixture<TableSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
