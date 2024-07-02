import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Delivery, IDelivery } from '../Models/Delivery/delivery';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiUrl = `${environment.baseUrl}/Delivery`;

  constructor(private http: HttpClient) { }

  getAllDeliveries(): Observable<IDelivery[]> {
    return this.http.get<IDelivery[]>(`${this.apiUrl}`);
  }

  getAllDeliveriesByState(state: string): Observable<Delivery[]> {
    return this.http.get<{ $id: string; $values: Delivery[] }>(`${this.apiUrl}`)
      .pipe(
        map(response => response.$values.filter((delegate: any) => delegate.government === state))
      );
  }

  getDeliveryById(id: string): Observable<IDelivery> {
    return this.http.get<IDelivery>(`${this.apiUrl}/${id}`);
  }

  addDelivery(delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(`${this.apiUrl}/AddDelivery`, delivery);
  }

  updateDelivery(id: string, delivery: Delivery): Observable<Delivery> {
    return this.http.put<Delivery>(`${this.apiUrl}/EditDelivery/${id}`, delivery);
  }

  deleteDelivery(id: string) {
    return this.http.delete(`${this.apiUrl}/DeleteDelivery/${id}`);
  }

    changeStatus(id: string, status: boolean): Observable<any> {
      return this.http.put(`${this.apiUrl}/ChangeStatus/${id}`, { status });
    }


}
