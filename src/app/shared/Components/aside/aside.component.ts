import { Component } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  dropdowns = {
    usersDropdown: false,
    regionsDropdown: false,
    settingsDropdown: false,
    userSettingsDropdown: false
  };

  toggleDropdown(dropdown: keyof typeof this.dropdowns) {
    this.dropdowns[dropdown] = !this.dropdowns[dropdown];
  }

  userName = 'اسم المستخدم';
}
