import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { city } from '../Models/city';
import { environment } from './environment';
@Injectable({
  providedIn: 'root',
})
export class CityService {
  private baseUrl = `${environment.baseUrl}/City`; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  getAllcities(id: number): Observable<city[]> {
    return this.http
      .get<{ $id: number; $values: city[] }>(`${this.baseUrl}/government/${id}`)
      .pipe(
        map((response) => response.$values) // Extract the values array
      );
  }
  getCityById(id: number): Observable<city> {
    return this.http.get<city>(`${this.baseUrl}/${id}`);
  }
  updatecityById(id: number, city: city): Observable<city> {
    return this.http.put<city>(`${this.baseUrl}/edit/${id}`, city);
  }

  addCity(city: city): Observable<any> {
    return this.http.post(this.baseUrl, city);
  }
  deleteCity(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
  changeCityStatus(id: number, status: boolean): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/change-status/${id}?status=${status}`,
      {}
    );
  }
}
