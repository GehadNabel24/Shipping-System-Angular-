import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginData } from '../Models/loginData';
import jwt_deocde from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl: string = 'http://localhost:5247/api';
  constructor(private http: HttpClient,private router:Router) {}

  Login_Account( formData: loginData ): Observable<any> {
    return this.http.post(`${this.baseUrl}/Account/Login`, formData);
  }

  handleLogin( res: any ) {
    localStorage.setItem('token', res.user.token);
    localStorage.setItem('userID', res.user.userID);
    localStorage.setItem('userName', res.user.userName);
    localStorage.setItem('role', res.user.role);
  this.router.navigate(['/employee/dashboard']);
  }

  test( ): Observable<any> {
    return this.http.get(`${this.baseUrl}//Administration`);
  }

}
