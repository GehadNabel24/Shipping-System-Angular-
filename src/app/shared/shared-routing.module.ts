import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { OrderListComponent } from './Components/order-list/order-list.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { OrderReportComponent } from './Components/order-report/order-report.component';

const routes: Routes = [
  { path: 'home' , component: HomeComponent},
  { path: 'dashboard' , component: DashboardComponent},
  { path: 'login' , component: LogInComponent},
  { path: 'change-password' , component: ChangePasswordComponent},
  { path: 'order-list' , component: OrderListComponent},
  { path: 'order-list/:status' , component: OrderListComponent},
  { path: 'order-report' , component: OrderReportComponent},
  { path: '**' , component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
