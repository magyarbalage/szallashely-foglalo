import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccommodationDialogComponent } from './add-accommodation-dialog.component';

describe('AddAccommodationDialogComponent', () => {
  let component: AddAccommodationDialogComponent;
  let fixture: ComponentFixture<AddAccommodationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAccommodationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAccommodationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
