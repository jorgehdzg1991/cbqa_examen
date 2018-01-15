import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../Models/person';
import { NotFoundError } from '../../common/not-found-error';
import { AbstractControl } from '@angular/forms/src/model';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  id: number;

  constructor(
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }

  updatePerson(resource) {
    if (resource instanceof Person) {
      this.personService.update(resource)
        .subscribe((person: Person) => {
          alert('Employee updated successfully');
          this.router.navigateByUrl('/persons');
        });
    }
  }

}
