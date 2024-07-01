import { Component } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}
  dropdowns = {
    usersDropdown: false,
    regionsDropdown: false,
    settingsDropdown: false,
    userSettingsDropdown: false
  };

  toggleDropdown(dropdown: keyof typeof this.dropdowns) {
    this.dropdowns[dropdown] = !this.dropdowns[dropdown];
  }
  logout() {
    this.accountService.LogOut_Account();
    this.router.navigate(['shared/login']);
  }

  userName = 'اسم المستخدم';
}
