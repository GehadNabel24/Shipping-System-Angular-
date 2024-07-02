import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment';
@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl = `${environment.baseUrl}/Account/changePassword`;
  constructor(private http: HttpClient) {}

  changePassword(passwordDTO: any): Observable<any> {
    return this.http.post(this.apiUrl, passwordDTO);
  }
}
