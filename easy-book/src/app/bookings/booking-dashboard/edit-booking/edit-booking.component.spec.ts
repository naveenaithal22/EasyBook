import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingComponent } from './edit-booking.component';

describe('RoomListComponent', () => {
  let component: AddBookingComponent;
  let fixture: ComponentFixture<AddBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
