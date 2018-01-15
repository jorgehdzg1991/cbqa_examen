import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../../Models/person';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { NotFoundError } from '../../common/not-found-error';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  @Input() id: number;
  @Input() formTitle: string;
  @Input() buttonIcon: string;
  @Input() buttonText: string;

  @Output() submit: EventEmitter<Person> = new EventEmitter();

  form: FormGroup;

  genderCatalog = [
    { value: 'F', text: 'Female' },
    { value: 'M', text: 'Male' }
  ];

  constructor(
    private personService: PersonService,
    private router: Router,
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this.personService.getById(this.id)
      .subscribe(
      (person) => {
        this.firstName.patchValue(person.firstName);
        this.lastName.patchValue(person.lastName);
        this.gender.patchValue(person.gender);
        this.age.patchValue(person.age);
      },
      (error) => {
        if (error instanceof NotFoundError) {
          alert('The employee does not exist');
          this.router.navigateByUrl('/persons');
        } else {
          throw error;
        }
      });
    }
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get gender() {
    return this.form.get('gender');
  }

  get age() {
    return this.form.get('age');
  }

  emitSubmitEvent() {
    const person = new Person();

    person.id = this.id;
    person.firstName = this.firstName.value;
    person.lastName = this.lastName.value;
    person.gender = this.gender.value;
    person.age = this.age.value;

    this.submit.emit(person);
  }

}
