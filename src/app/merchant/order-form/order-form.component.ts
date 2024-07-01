import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ICityDTO } from '../../shared/Models/ICityDTO';
import { IGovernmentDTO } from '../../shared/Models/IGovernmentDTO';
import { IMerchantDTO } from '../../shared/Models/IMerchant';
import { ApiService } from '../../shared/Services/api.service';
import { IOrder } from '../../shared/Models/order/order';
import { IOrderProduct } from './../../shared/Models/order/order';
import { OrderService } from './../../shared/Services/order.service';
import { CityService } from '../../shared/Services/city.service';
import { city } from '../../shared/Models/city';
import { Branch } from '../../shared/Models/branch';
import { StateService } from './../../shared/Services/state.service';
import { Government } from '../../shared/Models/government';
import { OrderType, PaymentType, ShippingType } from '../../shared/Models/order/constants';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  states: Government[] = [];
  cities: city[] = [];
  branches: Branch[] = [];
  shippingTypes = Object.values(ShippingType);
  paymentTypes = Object.values(PaymentType);
  orderTypes = Object.values(OrderType);
  isEditMode: boolean = false;
  orderId: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private stateService: StateService
  ) {
    this.orderForm = new FormGroup({
      type: new FormControl('', Validators.required),
      clientName: new FormControl('', Validators.required),
      clientPhoneNumber1: new FormControl('', Validators.required),
      clientPhoneNumber2: new FormControl(''),
      clientEmail: new FormControl('', [Validators.required, Validators.email]),
      stateName: new FormControl('', Validators.required),
      cityName: new FormControl({ value: '', disabled: true }, Validators.required),
      branchName: new FormControl({ value: '', disabled: true }, Validators.required),
      streetName: new FormControl('', Validators.required),
      shippingType: new FormControl('', Validators.required),
      paymentType: new FormControl('', Validators.required),
      isVillage: new FormControl(false),
      shippingCost: new FormControl({ value: 0, disabled: true }),
      totalWeight: new FormControl({ value: 0, disabled: true }),
      orderCost: new FormControl(0),
      notes: new FormControl(''),
      orderProducts: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
      if (this.orderId && this.orderId !== 0) {
        this.isEditMode = true;
        this.loadOrderData(this.orderId);
      }
    });

    this.orderProducts.valueChanges.subscribe(() => this.calculateTotals());
    this.stateService.getGovernments().subscribe({
      next: data => {
        this.states = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  get orderProducts(): FormArray {
    return this.orderForm.get('orderProducts') as FormArray;
  }

  loadOrderData(id: number): void {
    this.orderService.getOrderReceipt(id).subscribe({
      next: (order: IOrder) => {
        this.orderForm.patchValue(order);
        this.orderForm.setControl('orderProducts', new FormArray(order.orderProducts.map(product =>
          new FormGroup({
            productName: new FormControl(product.productName),
            productQuantity: new FormControl(product.productQuantity),
            weight: new FormControl(product.weight)
          })
        )));
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onStateChange(event: any): void {
    const state = event.target.value;
    if (state) {
      this.orderService.getCitiesByGovernment(state).subscribe((data: any) => {
        console.log(data.$values);
        this.cities = data.$values;
        this.orderForm.get('cityName')?.enable();
      });
      this.orderService.getBranchesByGovernment(state).subscribe({
        next: (data: any) => {
          console.log(data.$values);
          this.branches = data.$values;
          this.orderForm.get('branchName')?.enable();
        },
        error: err => {
          console.log(err);
        }
      });
    } else {
      this.cities = [];
      this.branches = [];
      this.orderForm.get('cityName')?.disable();
      this.orderForm.get('branchName')?.disable();
    }
  }

  addProduct(): void {
    const productFormGroup = new FormGroup({
      productName: new FormControl(''),
      productQuantity: new FormControl(1),
      weight: new FormControl(0)
    });
    this.orderProducts.push(productFormGroup);
    this.calculateTotals();
  }

  removeProduct(index: number): void {
    this.orderProducts.removeAt(index);
    this.calculateTotals();
  }

  calculateTotals(): void {
    const products = this.orderProducts.value;
    const totalWeight = products.reduce((sum: number, product: any) => sum + (product.weight * product.productQuantity), 0);
    this.orderForm.patchValue({ totalWeight }, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.orderForm.get('totalWeight')?.enable();
      const formData = this.orderForm.value;
      formData.type = OrderType[formData.type as keyof typeof OrderType];
      formData.shippingType = ShippingType[formData.shippingType as keyof typeof ShippingType];
      formData.paymentType = PaymentType[formData.paymentType as keyof typeof PaymentType];

      if (this.isEditMode) {
        this.orderService.editOrder(this.orderId, formData).subscribe({
          next: (data: any) => {
            console.log(data);
            this.navigateToDashboard();
          },
          error: err => {
            console.log(err);
          }
        });
      } else {
        this.orderService.addOrder(formData).subscribe({
          next: (data: any) => {
            console.log(data);
            this.navigateToDashboard();
          },
          error: err => {
            console.log(err);
          }
        });
      }
      console.log(formData);
    }
  }

  navigateToDashboard(): void {
    this.router.navigate(['/shared/dashboard']);
  }
}
