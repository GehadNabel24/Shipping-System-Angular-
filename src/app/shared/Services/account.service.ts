import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  token: any;
  constructor() {
    this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijc2Zjg2MDczLWI1MWMtNDdjNC1iN2ZhLTczMTYyODA1NWViYiIsImV4cCI6MTcxOTgxNDIzM30.S7TVv75JCC33CpEDi90MHb9T0_NLt2Y9hcCsUZ2TzJQ";
   }
   settoken(value: any) {
     this.token = value;
   }
  getToken() {
    return this.token;
  }
}
