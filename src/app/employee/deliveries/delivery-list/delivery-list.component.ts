import { Component, OnInit } from '@angular/core';
import { Delivery } from '../../../shared/Models/Delivery/delivery';
import { DeliveryService } from '../../../shared/Services/delivery.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrl: './delivery-list.component.css'
})
export class DeliveryListComponent implements OnInit {
  deliveries: Delivery[] = [];

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries(): void {
    this.deliveryService.getAllDeliveries().subscribe(deliveries => {
      this.deliveries = deliveries;
    });
  }

  deleteDelivery(id: string): void {
    this.deliveryService.deleteDelivery(id).subscribe(() => {
      this.loadDeliveries();
    });
  }

  changeStatus(id: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked; // Cast event target properly
    this.deliveryService.changeStatus(id, checked).subscribe(() => {
      this.loadDeliveries();
    });
  }
}
