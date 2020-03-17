import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleContactsComponent } from './vehiclecontacts.component';



describe('VehicleContactsComponent', () => {
  let component: VehicleContactsComponent;
  let fixture: ComponentFixture<VehicleContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleContactsComponent ]
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
