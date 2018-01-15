import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../Models/person';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit {

  constructor(
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createPerson(resource) {
    if (resource instanceof Person) {
      this.personService.create(resource)
        .subscribe((newPerson) => {
          alert('Employee created successfully');
          this.router.navigateByUrl('/persons');
        });
    }
  }

}
