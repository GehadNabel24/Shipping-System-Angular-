import { IEmployeeData } from '../models/Employees';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(employees: IEmployeeData[], term: string) : IEmployeeData[]{
    return employees.filter((employee => employee.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())));
  }

}
