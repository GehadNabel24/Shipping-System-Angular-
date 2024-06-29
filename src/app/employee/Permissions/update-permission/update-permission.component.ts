import { Component, OnInit, OnDestroy } from '@angular/core';
import { IClaimsForCheckBox, IRoleWithAllClaims } from '../../../shared/Models/Permissions/PermissionOnRole';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsService } from '../../../shared/Services/permissions.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-permission',
  templateUrl: './update-permission.component.html',
  styleUrls: ['./update-permission.component.css']
})
export class UpdatePermissionComponent implements OnInit, OnDestroy {
  roleWithAllClaims: IRoleWithAllClaims | null = null;
  permissionsOnRoleSubscription: Subscription | undefined;
  roleId: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private permissionsService: PermissionsService
  ) { }

  ngOnInit() {
    this.roleId = this.route.snapshot.paramMap.get('id');
    if (this.roleId) {
      this.permissionsOnRoleSubscription = this.permissionsService.getPermissionById(this.roleId).subscribe(response => {
        this.roleWithAllClaims = response;
      });
    }
  }

  ngOnDestroy() {
    if (this.permissionsOnRoleSubscription) {
      this.permissionsOnRoleSubscription.unsubscribe();
    }
  }

  onCheckboxChange(displayValue: string, event: Event) {
    const isSelected = (event.target as HTMLInputElement).checked;
    if (this.roleWithAllClaims) {
      const role = this.roleWithAllClaims.allRoleCalims.find(c => c.displayValue === displayValue);
      if (role) {
        role.isSelected = isSelected;
      }
    }
  }

  isClaimSelected(role: IClaimsForCheckBox | undefined): boolean {
    return role ? role.isSelected : false;
  }

  groupClaimsByArabicName() {
    const groupedClaims: { [key: string]: any } = {};
    if (this.roleWithAllClaims) {
      this.roleWithAllClaims.allRoleCalims.forEach(claim => {
        const arabicName = claim.arabicName || 'Unknown';
        if (!groupedClaims[arabicName]) {
          groupedClaims[arabicName] = {};
        }
        if (claim.displayValue.includes('View')) {
          groupedClaims[arabicName].view = claim;
        } else if (claim.displayValue.includes('Create')) {
          groupedClaims[arabicName].create = claim;
        } else if (claim.displayValue.includes('Edit')) {
          groupedClaims[arabicName].edit = claim;
        } else if (claim.displayValue.includes('Delete')) {
          groupedClaims[arabicName].delete = claim;
        }
        groupedClaims[arabicName].arabicName = arabicName;
      });
    }
    return Object.values(groupedClaims);
  }

  saveChanges() {
    if (this.roleWithAllClaims && this.roleId) {
      this.permissionsService.editPermissionsOnRole(this.roleId, this.roleWithAllClaims).subscribe(response => {
        console.log('Roles updated successfully');
      }, error => {
        console.error('Error updating roles', error);
      });
    }
  }

  cancelChanges() {
    this.router.navigate(['/employee/permission']);
  }
}
