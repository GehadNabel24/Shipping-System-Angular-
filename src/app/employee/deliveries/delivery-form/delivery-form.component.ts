import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryService } from '../../../shared/Services/delivery.service';
import { Delivery } from '../../../shared/Models/Delivery/delivery';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrl: './delivery-form.component.css'
})
export class DeliveryFormComponent implements OnInit {
  deliveryForm: FormGroup;
  id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,  // Make router public
    private deliveryService: DeliveryService
  ) {
    this.deliveryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      branchId: ['', Validators.required],
      government: ['', Validators.required],
      address: ['', Validators.required],
      discountType: ['', Validators.required],
      companyPercent: ['', Validators.required],
      status: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id && this.id !== '0') {
      this.deliveryService.getDeliveryById(this.id).subscribe(delivery => {
        this.deliveryForm.patchValue(delivery);
      });
    }
  }

  onSubmit(): void {
    if (this.deliveryForm.valid) {
      const delivery: Delivery = this.deliveryForm.value;
      if (this.id === '0') {
        this.deliveryService.addDelivery(delivery).subscribe(() => {
          this.router.navigate(['/view-deliveries']);
        });
      } else {
        this.deliveryService.updateDelivery(this.id!, delivery).subscribe(() => {
          this.router.navigate(['/view-deliveries']);
        });
      }
    }
  }
}
