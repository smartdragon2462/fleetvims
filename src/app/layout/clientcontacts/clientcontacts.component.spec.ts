import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContactsComponent } from './clientcontacts.component';



describe('ClientContactsComponent', () => {
  let component: ClientContactsComponent;
  let fixture: ComponentFixture<ClientContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientContactsComponent ]
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
