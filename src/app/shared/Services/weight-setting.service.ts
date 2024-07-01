import { Injectable } from '@angular/core';
import { IWeightSetting } from '../Models/Weight/weight';
import { Observable, mergeMap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './environment';
@Injectable({
  providedIn: 'root'
})
export class WeightSettingService {
  apiUrl: string = `${environment.baseUrl}/WeightSetting`;
  constructor(private http: HttpClient) { }
  getWeightSetting(): Observable<IWeightSetting> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<IWeightSetting>(this.apiUrl, { headers });
  }

  updateWeightSetting(ws: IWeightSetting): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<void>(this.apiUrl, ws, { headers });
  }
}
