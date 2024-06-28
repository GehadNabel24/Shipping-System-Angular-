import { Routes } from '@angular/router';
import { SharedRoutingModule } from './shared/shared-routing.module';
import { DashboardComponent } from './shared/Components/dashboard/dashboard.component';
export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    }
    ,
    {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
    },
    {
        path: 'merchant',
        loadChildren: () => import('./merchant/merchant.module').then(m => m.MerchantModule)
    }
    ,
    {
        path: 'shared',
        loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
    }
];
