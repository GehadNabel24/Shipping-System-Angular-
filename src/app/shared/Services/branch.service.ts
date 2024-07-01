import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAllBranch } from '../models/branch';
@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private baseUrl = 'http://localhost:5247/api/Branch'; 

  constructor(private http: HttpClient) {}

  getBranches(): Observable<getAllBranch[]> {
    return this.http.get<{ $id: string; $values: getAllBranch[] }>(this.baseUrl)
      .pipe(
        map(response => response.$values) 
      );
  }


  getBranchById(id: number): Observable<getAllBranch> {
    return this.http.get<getAllBranch>(`${this.baseUrl}/${id}`);
  }
  
}
