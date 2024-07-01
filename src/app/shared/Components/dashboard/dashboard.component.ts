import { Component, OnInit } from '@angular/core';
import { OrderService } from './../../Services/order.service';
import { OrderStatus } from '../../Models/order/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orderStatus = Object.values(OrderStatus);
  statusCounts: { status: string, count: number }[] = [];
  userRole: string='';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || '';
    this.getOrderStatusCounts();
  }

  getOrderStatusCounts(): void {
    this.orderStatus.forEach(status => {
      if (this.userRole === 'المناديب' && status === 'جديد') {
        return;
      }
      this.orderService.getOrdersByStatusCount(status).subscribe({
        next: (count: number) => {
          this.statusCounts.push({ status, count });
        },
        error: (error: any) => {
          console.error(`Error fetching count for ${status}`, error);
          this.statusCounts.push({ status, count: 0 });
        }
      });
    });
  }
}
