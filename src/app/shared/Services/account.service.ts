import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  token: any;
  constructor() {
    this.token = " dvgjegkhhdcjdebhjcvdgjvhjhhggh";
   }
   settoken(value: any) {
     this.token = value;
   }
  getToken() {
    return this.token;
  }
}
