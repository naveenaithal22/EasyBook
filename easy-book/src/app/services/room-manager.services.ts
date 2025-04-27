import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { RoomModel } from "../models/room.model";

@Injectable({
  providedIn: "root",
})
export class RoomManagerService {
  apiEndpoint: string | undefined;

  constructor(private http: HttpClient) {
    this.apiEndpoint = "room-api";
  }

  get(): Observable<RoomModel[]> {
    return this.http.get<RoomModel[]>(this.apiEndpoint + "/api/Room/");
  }

  post(request: RoomModel): Observable<number> {
    return this.http.post<number>(`${this.apiEndpoint}/api/Room`, request);
  }

  put(id: number, request: RoomModel): Observable<object> {
    return this.http.put(`${this.apiEndpoint}/api/Room/${id}`, request);
  }

  delete(id: number): Observable<object> {
    return this.http.delete(`${this.apiEndpoint}/api/Room/${id}`);
  }
}
