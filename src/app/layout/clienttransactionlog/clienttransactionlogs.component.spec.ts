import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTransactionLogsComponent } from './clienttransactionlogs.component';



describe('ClientTransactionLogsComponent', () => {
  let component: ClientTransactionLogsComponent;
  let fixture: ComponentFixture<ClientTransactionLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientTransactionLogsComponent ]
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
