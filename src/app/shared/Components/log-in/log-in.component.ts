import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../Services/account.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {
  token:string = "----------------- team 4 --- hdhghjgekhdjhdvghfgf";
  constructor(
    public Accountservice: AccountService
  ) {
  }
  ngOnInit(): void {
    this.Accountservice.settoken(this.token);
    localStorage.setItem('token',this.token);
  }
}
