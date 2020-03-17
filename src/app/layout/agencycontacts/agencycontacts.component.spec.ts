import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyContactsComponent } from './agencycontacts.component';



describe('AgencyContactsComponent', () => {
  let component: AgencyContactsComponent;
  let fixture: ComponentFixture<AgencyContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyContactsComponent ]
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
