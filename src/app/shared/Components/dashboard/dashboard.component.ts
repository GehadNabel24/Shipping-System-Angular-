import { Component } from '@angular/core';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor( private accountService:AccountService){}

  getroles(){
    this.accountService.test().subscribe({
      next: (res) => {
       console.log(res);
      },
      error: (err) => {
        console.log(err)
      },
  })
}
}
