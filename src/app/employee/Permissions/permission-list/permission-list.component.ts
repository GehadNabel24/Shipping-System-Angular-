import { IPermission, IPermissionResponse } from '../../../shared/Models/Permissions/permission';
import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { PermissionsService } from './../../../shared/Services/permissions.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-permission-list',
  providers: [],
  templateUrl: './permission-list.component.html',
  styleUrl: './permission-list.component.css',
})
export class PermissionListComponent implements OnInit,OnDestroy {
  permissions: IPermission[]=[];
  PermissionSubscription: any;
  PermissionDeleteSubscription: any;
  constructor(public permissionsService: PermissionsService) {}
  ngOnInit(): void {
    localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijc2Zjg2MDczLWI1MWMtNDdjNC1iN2ZhLTczMTYyODA1NWViYiIsImV4cCI6MTcxOTc3MzI0OH0.bE9i62cWj_eFIABGD06YQ0J0y2MfiZ656W47Kn51-oA");
    this.getPermissions();
  }
  getPermissions(): void {
    this.PermissionSubscription = this.permissionsService.getPermissions().subscribe({
      next: (response: any) => {
        this.permissions = response.$values;
      },
      error: (err) => {
        Swal.fire(
          'عرض !',
          'حدث خطأ في عرض الصلاحيات',
          'error'
        );
        console.log(err.message);
      }
    });
  }
  onSearch(query: string): void {
    if (query.trim() !== '') {
      console.log('Searching for:', query);
      this.permissionsService.searchPermissions(query).subscribe({
        next: (response: any) => {
          console.log(response);
          this.permissions = response.$values;
        },
        error: (err) => {
          Swal.fire(
            'بحث !',
            'حدث خطأ في البحث عن هذه الصلاحية',
            'error'
          );
          console.error('Error searching permissions', err);
        }
      });
    } else {
      this.getPermissions();
    }
  }
  deletePermission(id: string): void {
    Swal.fire({
      title: 'هل انت متأكد',
      text: 'سيتم حذف هذا الصلاحيه',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم, قم بالحذف',
      cancelButtonText: 'لا, الغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        this.PermissionDeleteSubscription = this.permissionsService.deleteRole(id).subscribe({
          next: () => {
            this.permissions = this.permissions.filter(p => p.id !== id);
            Swal.fire(
              'حذف صلاحية!',
              'تم حذف هذه الصلاحية.',
              'success'
            );
          },
          error: (err) => {
            Swal.fire(
              'حذف صلاحية!',
              'لم يتم حذف هذه الصلاحية.',
              'error'
            );
            console.log("error",err.message);
          }
        });
      }
    });
  }
  ngOnDestroy(): void {
    if (this.PermissionSubscription) {
      this.PermissionSubscription.unsubscribe();
    }
    if (this.PermissionDeleteSubscription) {
      this.PermissionDeleteSubscription.unsubscribe();
    }
  }
}
