import { Component, OnInit } from '@angular/core';
import { CityService } from '../../../shared/Services/city.service';
import { city } from '../../../shared/models/city';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cityData: city[] = [];
  searchterm = "";
  recordLimit: number = 5;

  constructor(private _CityService: CityService) {}

  ngOnInit(): void {
    this._CityService.getAllcities(1).subscribe({
      next: (response) => {
        this.cityData = response;
        console.log(this.cityData);
      },
      error: (err) => {
        console.error('Error fetching cities', err);
        this.showApiConnectionErrorAlert();
      },
    });
  }

  deleteCity(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this city!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this._CityService.deleteCity(id).subscribe({
          next: () => {
            console.log(`City with id ${id} deleted successfully`);
            this.cityData = this.cityData.filter(city => city.id !== id);
            this.showDeleteSuccessAlert();
          },
          error: (err) => {
            console.error(`Error deleting City with id ${id}`, err);
            this.showDeleteErrorAlert();
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your city is safe :)', 'error');
      }
    });
  }

  changeStatus(city: city) {
    const newStatus = !city.status;
    this._CityService.changeCityStatus(city.id, newStatus).subscribe({
      next: (response) => {
        city.status = newStatus;
        console.log('City status changed successfully', response);
        this.showStatusChangeSuccessAlert();
      },
      error: (err) => {
        console.error('Error changing city status', err);
        this.showStatusChangeErrorAlert();
      }
    });
  }

  private showDeleteSuccessAlert(): void {
    Swal.fire('Deleted!', 'City has been deleted.', 'success');
  }

  private showDeleteErrorAlert(): void {
    Swal.fire('Error!', 'Failed to delete city.', 'error');
  }

  private showStatusChangeSuccessAlert(): void {
    Swal.fire('Success!', 'City status changed successfully.', 'success');
  }

  private showStatusChangeErrorAlert(): void {
    Swal.fire('Error!', 'Failed to change city status.', 'error');
  }

  private showApiConnectionErrorAlert(): void {
    Swal.fire('Error', 'Failed to connect to the API.', 'error');
  }
}
