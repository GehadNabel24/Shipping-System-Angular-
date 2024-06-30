import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
import { DeliveryListComponent } from './deliveries/delivery-list/delivery-list.component';
import { DeliveryFormComponent } from './deliveries/delivery-form/delivery-form.component';
import { MerchantListComponent } from './merchants/merchant-list/merchant-list.component';
import { MerchantFormComponent } from './merchants/merchant-form/merchant-form.component';
import { StateFormComponent } from './States/state-form/state-form.component';
import { StateListComponent } from './States/state-list/state-list.component';
import { BranchListComponent } from './Branches/branch-list/branch-list.component';
import { BranchFormComponent } from './Branches/branch-form/branch-form.component';
import { CityFormComponent } from './Cities/city-form/city-form.component';
import { CityListComponent } from './Cities/city-list/city-list.component';
import { WightSettingComponent } from './Weight/wight-setting/wight-setting.component';
import { PermissionListComponent } from './Permissions/permission-list/permission-list.component';
import { AddPermissionComponent } from './Permissions/add-permission/add-permission.component';
import { UpdatePermissionComponent } from './Permissions/update-permission/update-permission.component';
import { SharedRoutingModule } from '../shared/shared-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeFormComponent,
    DeliveryListComponent,
    DeliveryFormComponent,
    MerchantListComponent,
    MerchantFormComponent,
    StateFormComponent,
    StateListComponent,
    BranchListComponent,
    BranchFormComponent,
    CityFormComponent,
    CityListComponent,
    WightSettingComponent,
    PermissionListComponent,
    AddPermissionComponent,
    UpdatePermissionComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    ReactiveFormsModule

  ]
})
export class EmployeeModule { }
