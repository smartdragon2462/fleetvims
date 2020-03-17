import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyTransactionLogsComponent } from './policytransactionlogs.component';



describe('PolicyTransactionLogsComponent', () => {
  let component: PolicyTransactionLogsComponent;
  let fixture: ComponentFixture<PolicyTransactionLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyTransactionLogsComponent ]
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
