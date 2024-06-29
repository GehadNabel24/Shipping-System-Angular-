import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WeightSettingService } from '../../../shared/Services/weight-setting.service';

@Component({
  selector: 'app-wight-setting',
  templateUrl: './wight-setting.component.html',
  styleUrls: ['./wight-setting.component.css']
})
export class WightSettingComponent implements OnInit, OnDestroy {
  updateSubscription: any;
  weightSettingSubscription: any;
  weightSettingData = new FormGroup({
    standaredWeight: new FormControl("", [Validators.required, Validators.min(10)]),
    additionCost: new FormControl("", [Validators.required, Validators.min(100)]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weightSettingService: WeightSettingService
  ) {}

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
    if (this.weightSettingSubscription) {
      this.weightSettingSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.weightSettingSubscription = this.weightSettingService.getWeightSetting().subscribe({
      next: (response: any) => {
        this.weightSettingData.patchValue(response);
      }
    });
  }

  get getStandaredWeight() {
    return this.weightSettingData.controls['standaredWeight'];
  }

  get getAdditionCost() {
    return this.weightSettingData.controls['additionCost'];
  }

  onSubmit() {
    if (this.weightSettingData.valid) {
      const data: any = this.weightSettingData.value;
      this.updateSubscription = this.weightSettingService.updateWeightSetting(data).subscribe({
        next: () => {
          console.log('Weight Setting updated successfully');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error updating Weight Setting', err);
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
