import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReportsComponent } from './clientreports.component';



describe('ClientReportsComponent', () => {
  let component: ClientReportsComponent;
  let fixture: ComponentFixture<ClientReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientReportsComponent ]
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
