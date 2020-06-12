import { Injectable } from '@angular/core';
import { Booking } from '../bookings/bookings/booking.model';


@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  bookings: Booking[] = [
  ];


  constructor() {}

  getBooking(id: string) {
    return {...this.bookings.find(p => p.id === id)};
  }

  addBooking(booking: Booking){
    this.bookings.push(booking);
  }
}

