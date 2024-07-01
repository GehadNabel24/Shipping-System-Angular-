import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IEmployeeData } from '../Models/Employees';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = `${environment.baseUrl}/Employees`;
  Employees: IEmployeeData[] = []; 

  constructor(private http: HttpClient) {
   
  }

  getAllEmployees(page: number = 1, pageSize: number = 9): Observable<IEmployeeData[]> {
    const url = `${this.baseUrl}?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url).pipe(
      map(response => response.employeesList.$values)
    );
  }

  getEmployeeById(id: string): Observable<IEmployeeData> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IEmployeeData>(url);
  }

  addNewEmployee(employee: IEmployeeData) : Observable<IEmployeeData>{
    return this.http.post<IEmployeeData>(this.baseUrl , employee);
  }

  editEmployee(id: string, employee: IEmployeeData): Observable<IEmployeeData> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<IEmployeeData>(url, employee);
  }

  updateEmployeeStatus(employeeId: string, status: boolean): Observable<any> {
    const url = `${this.baseUrl}/status/${employeeId}?status=${status}`;
    return this.http.put<any>(url, null);
  }

  deleteEmployee(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
