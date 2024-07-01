import { Pipe, PipeTransform } from '@angular/core';
import { IState } from '../models/IState';

@Pipe({
  name: 'searchState',
  standalone: true
})
export class SearchStatePipe implements PipeTransform {

  transform(employees: IState[], term: string) : IState[]{
    return employees.filter((employee => employee.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())));
  }

}
