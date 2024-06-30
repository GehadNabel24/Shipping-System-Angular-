import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPermission, IPermissionResponse } from '../Models/Permissions/permission';
import { Observable, mergeMap, throwError } from 'rxjs';
import { IRoleWithAllClaims } from '../Models/Permissions/PermissionOnRole';
@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  apiUrl: string = 'http://localhost:37667/api/Administration';
  constructor(private http: HttpClient) { }
  getPermissions():Observable<IPermissionResponse[]> {
    let token = localStorage.getItem('token');
    let options = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }) };
    return this.http.get<IPermissionResponse[]>(this.apiUrl, options);
  }
  getPermissionById(id: string): Observable<IRoleWithAllClaims> {
    let token = localStorage.getItem('token');
    let options = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }) };
    return this.http.get<IRoleWithAllClaims>(`${this.apiUrl}/GetPermissionsOnRole/${id}`, options);
  }
  searchPermissions(query:string):Observable<IPermissionResponse[]> {
    let token = localStorage.getItem('token');
    let options = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }) };
    return this.http.get<IPermissionResponse[]>(`${this.apiUrl}/${query}`, options);
  }
  addPermission(permission: any): Observable<IPermission> {
    let token = localStorage.getItem('token');
    let options = { headers: new HttpHeaders({ 'Authorization': 'Bearer'+ token }) };
    return this.http.post<IPermission>(this.apiUrl, permission, options);
  }
  updatePermission(permission: any): Observable<IPermission> {
    let token = localStorage.getItem('token');
    let options = { headers: new HttpHeaders({ 'Authorization': 'Bearer'+ token }) };
    return this.http.put<IPermission>(`${this.apiUrl}/${permission.id}`, permission, options);
  }
  editPermissionsOnRole(id: string, roleWithClaims: IRoleWithAllClaims): Observable<any> {
    let token = localStorage.getItem('token');
    let options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(`${this.apiUrl}/EditPermissionsOnRole/${id}`, roleWithClaims, options);
  }
  deleteRole(id: string): Observable<any> {
    let token = localStorage.getItem('token');
    let options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.delete<any>(`${this.apiUrl}/${id}`, options);
  }
}
