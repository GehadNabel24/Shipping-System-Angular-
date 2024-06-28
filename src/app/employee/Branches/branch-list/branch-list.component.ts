import { Component, OnInit } from '@angular/core';
import { AccountService } from './../../../shared/Services/account.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.css'
})
export class BranchListComponent implements OnInit {
  token:any;
  constructor(
    public accountservice: AccountService
  ) {
  }
  ngOnInit(): void {
    this.token =localStorage.getItem('token') ?? this.accountservice.getToken();
  }

}
