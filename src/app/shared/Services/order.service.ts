import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IorderResponse } from '../Models/order/orderResponse';
import { IOrder } from '../Models/order/order';
import { city } from '../Models/city';
import { Branch } from '../Models/branch';
import { OrderStatus } from '../Models/order/constants';
import { environment } from './environment';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.baseUrl}/Order`;

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<IorderResponse[]> {
    return this.http.get<IorderResponse[]>(`${this.apiUrl}/Index`);
  }

  getOrdersByStatus(status: OrderStatus | null): Observable<IOrder[]> {
    const statusParam = status ? encodeURIComponent(status) : '';
    return this.http.get<{ $values: IOrder[] }>(`${this.apiUrl}/GetOrdersDependonStatus?status=${statusParam}`)
      .pipe(
        map(response => response.$values)
      );
  }

  getOrdersByStatusCount(status: OrderStatus | null): Observable<number> {
    return this.getOrdersByStatus(status).pipe(
      map(orders => orders.length)
    );
  }

  searchOrdersByClientName(query: string): Observable<IorderResponse[]> {
    return this.http.get<IorderResponse[]>(`${this.apiUrl}/SearchByClientName?query=${query}`);
  }

  searchOrdersByDeliveryName(query: string): Observable<IorderResponse[]> {
    return this.http.get<IorderResponse[]>(`${this.apiUrl}/SearchByDeliveryName?query=${query}`);
  }

  getOrderReceipt(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/OrderReceipt?id=${id}`);
  }

  changeOrderDelivery(id: number, deliveryId: number): Observable<void> {
    // return this.http.put<void>(`${this.apiUrl}/ChangeDelivery?id=${id}&deliveryId=${deliveryId}`);
    return this.http.put<void>(`${this.apiUrl}/ChangeDelivery?id=${id}&deliveryId=${deliveryId}`, {});
  }

  changeOrderStatus(id: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/ChangeStatus?id=${id}&status=${status}`, {});
  }

  editOrder(id: number, order: any): Observable<void> {
    console.log(id);
    return this.http.put<void>(`${this.apiUrl}/Edit/${id}`,order );
  }

  addOrder(order: IOrder): Observable<IorderResponse> {
    let token = localStorage.getItem('token');
    let options = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }) };
    return this.http.post<IorderResponse>(`${this.apiUrl}/Add`, order, options);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Delete?id=${id}`);
  }

  getOrderCount(): Observable<IorderResponse[]> {
    return this.http.get<IorderResponse[]>(`${this.apiUrl}/OrderCount`);
  }

  getOrdersAfterFilter(query: string): Observable<IorderResponse[]> {
    return this.http.get<IorderResponse[]>(`${this.apiUrl}/IndexAfterFilter?query=${query}`);
  }
  
  getCitiesByGovernment(governmentId: number): Observable<city[]> {
    return this.http.get<city[]>(`${this.apiUrl}/GetCitiesByGovernment?governmentId=${governmentId}`);
  }

  getBranchesByGovernment(governmentId: number): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.apiUrl}/GetBranchesByGovernment?government=${governmentId}`);
  }


}
