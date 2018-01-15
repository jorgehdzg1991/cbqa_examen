import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { PersonService } from '../../services/person.service';
import { Person } from '../../Models/person';
import { NotFoundError } from '../../common/not-found-error';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  persons: Person[];

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.personService.getAll()
      .subscribe((persons: Person[]) => {
        this.persons = persons;
      });
  }

  deletePerson(person: Person) {
    const index = this.persons.indexOf(person);

    this.persons.splice(index, 1);

    this.personService.delete(person.id)
      .subscribe((result) => {
        alert('The employee was succesfully deleted');
      },
      (error: Response) => {
        if (error instanceof NotFoundError) {
          this.persons.splice(index, 0, person);

          alert('The employee has already been deleted');
        } else {
          throw error;
        }
      });
  }

}
