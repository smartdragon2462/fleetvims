import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LienholderContactsComponent } from './lienholdercontacts.component';



describe('LienholderContactsComponent', () => {
  let component: LienholderContactsComponent;
  let fixture: ComponentFixture<LienholderContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LienholderContactsComponent ]
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
