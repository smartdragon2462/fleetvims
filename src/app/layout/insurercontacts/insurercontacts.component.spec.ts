import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurerContactsComponent } from './insurercontacts.component';



describe('InsurerContactsComponent', () => {
  let component: InsurerContactsComponent;
  let fixture: ComponentFixture<InsurerContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurerContactsComponent ]
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
