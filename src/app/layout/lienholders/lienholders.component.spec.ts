import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LienholdersComponent } from './lienholders.component';



describe('LienholdersComponent', () => {
  let component: LienholdersComponent;
  let fixture: ComponentFixture<LienholdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LienholdersComponent ]
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
