import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTransactionLogsComponent } from './vehicletransactionlogs.component';



describe('VehicleTransactionLogsComponent', () => {
  let component: VehicleTransactionLogsComponent;
  let fixture: ComponentFixture<VehicleTransactionLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTransactionLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
