import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { BookingModel } from "../models/booking.model";

@Injectable({
  providedIn: "root",
})
export class BookingManagerService {
  apiEndpoint: string | undefined;

  constructor(private http: HttpClient) {
    this.apiEndpoint = "booking-api";
  }

  get(): Observable<BookingModel[]> {
    return this.http.get<BookingModel[]>(this.apiEndpoint + "/api/Booking/");
  }

  post(request: BookingModel): Observable<number> {
    return this.http.post<number>(`${this.apiEndpoint}/api/Booking`, {
      booking: request,
    });
  }

  put(id: number, status: string): Observable<object> {
    return this.http.put(`${this.apiEndpoint}/api/Booking/${id}`, { status });
  }

  delete(id: number): Observable<object> {
    return this.http.delete(`${this.apiEndpoint}/api/Booking/${id}`);
  }
}
