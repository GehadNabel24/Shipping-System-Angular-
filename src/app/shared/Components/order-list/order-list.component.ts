import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderStatus } from '../../Models/order/constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../Services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Delivery } from './../../Models/Delivery/delivery';
import { DeliveryService } from '../../Services/delivery.service';
import { IOrder } from '../../Models/order/order';
import Swal from 'sweetalert2';
import { PdfGeneratorService } from '../../Services/pdf-generator.service';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  @ViewChild('orderTable') orderTable!: ElementRef;
  orders:IOrder[] =[{}] as IOrder[] 
  orderStatus =Object.values(OrderStatus);
  delegates: Delivery[] = [{}] as Delivery[];
  filteredOrders = [...this.orders];
  searchType: string = 'status'; 
  selectedOrder:any= this.filteredOrders[0];
  canEdit: boolean = false;
  pages = [1, 2, 3, 4];
  statusForm: FormGroup = new FormGroup({
      status: new FormControl(this.selectedOrder.status,{validators: [Validators.required]}),
    });
  deliveryForm: FormGroup = new FormGroup({
    delegateName: new FormControl(this.selectedOrder.delegateName,{validators: [Validators.required]}),
  });
  constructor(
    private pdfGeneratorService: PdfGeneratorService,
    private orderService: OrderService,
    private deliveryService: DeliveryService
  ) { }

  ngOnInit(): void {
    this.checkUserRole();
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data: any) => {
        console.log(data.$values);
        this.orders = data.$values;
        this.filteredOrders = [...this.orders];
      }
    });
  }

  checkUserRole(): void {
    const role = localStorage.getItem('role');
    console.log(role);
    this.canEdit = role === 'Admin' || role === 'تاجر' || role === 'موظف';
  }

  setSearchType(type: string): void {
    this.searchType = type;
  }

  onSearch(searchValue: string): void {
    if (searchValue.trim() === '') {
      this.filteredOrders = [...this.orders];
    } else {
      this.filteredOrders = this.orders.filter(order => {
        if (this.searchType === 'status') {
          return order.orderStatus.includes(searchValue);
        } else if (this.searchType === 'delegateName') {
          // return order.deliveryId.includes(searchValue);
        } else if (this.searchType === 'clientName') {
          return order.clientName.includes(searchValue);
        }
        return false;
      });
    }
  }

  getDelegatesByState(state: string) {
    this.deliveryService.getAllDeliveriesByState(state).subscribe({
      next: (data: any) => {
        this.delegates = data;
        console.log(this.delegates);
      },
      error: (error: any) => {
        console.error('Error fetching deliveries:', error);
      }
    });
  }
  

  openModal(order: any, change:string): void {
    if (order) {
      this.selectedOrder = { ...order };
      let modalElement;
      if(change=="status"){
        this.statusForm.patchValue({
          orderStatus: this.selectedOrder.status
        });
         modalElement = document.getElementById('UpdateStatus');
      }else if(change=="delivery"){
        this.deliveryForm.patchValue({
          delegateName: this.selectedOrder.delegateName
        });
         modalElement = document.getElementById('UpdateDelivery');
      }
      if (modalElement) {
        modalElement?.classList.add('fade', 'show');
        modalElement?.setAttribute('style', 'display: block;');
      }
    }
  }

  closeModel(chnage:string): void {
    let modalElement;
    if(chnage=="status"){
       modalElement = document.getElementById('UpdateStatus');
    }else if(chnage=="delivery"){
       modalElement = document.getElementById('UpdateDelivery');
    }
    if (modalElement) {
      modalElement?.classList.remove('fade', 'show');
      modalElement?.setAttribute('style', 'display: none;');
    }
  }
  updateOrder(change:string): void {
    let modalElement;
    if(change=="status"){
      const newStatus = this.statusForm.value.orderStatus;
      this.selectedOrder.status = newStatus;
      this.orderService.changeOrderStatus(this.selectedOrder.id, newStatus).subscribe({
        next: (data: any) => {
          this.loadOrders();
          modalElement = document.getElementById('UpdateStatus');
          if (modalElement) {
            modalElement?.classList.remove('fade', 'show');
            modalElement?.setAttribute('style', 'display: none;');
          }
        },
        error: (error: any) => {
          console.error('Error changing order status:', error);
        }
      })
    }else if(change=="delivery"){
      const newDelegate = this.deliveryForm.value.delegateName;
      this.selectedOrder.delegateName = newDelegate;
      this.orderService.changeOrderDelivery(this.selectedOrder.id,newDelegate ).subscribe({
        next: (data: any) => {
          this.loadOrders();
          modalElement = document.getElementById('UpdateStatus');
          if (modalElement) {
            modalElement?.classList.remove('fade', 'show');
            modalElement?.setAttribute('style', 'display: none;');
          }
        },
        error: (error: any) => {
          console.error('Error changing order status:', error);
        }
      })
    }
  }

  printToPdf(order: any): void {
    const tableElement = this.orderTable.nativeElement;
    this.pdfGeneratorService.generatePdf(tableElement, `order_${order.id}`);
  }

  deleteOrder(id: number|undefined): void {
    if (id) {
      Swal.fire({
        title: 'هل انت متأكد',
        text: 'سيتم حذف هذا الطلب',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'نعم, قم بالحذف',
        cancelButtonText: 'لا, الغاء',
      }).then((result) => {
        if (result.isConfirmed) {
          this.orderService.deleteOrder(id).subscribe({
            next: () => {
              this.orders = this.orders.filter(p => p.id !== id);
              Swal.fire(
                'حذف طلب!',
                'تم حذف هذا الطلب.',
                'success'
              );
            },
            error: (err) => {
              Swal.fire(
                'حذف طلب!',
                'لم يتم حذف هذا الطلب.',
                'error'
              );
              console.log("error",err.message);
            }
          });
        }
      });
    }
  }
}
