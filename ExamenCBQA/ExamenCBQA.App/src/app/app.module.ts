import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppErrorHandler } from './common/app-error-handler';
import { PersonService } from './services/person.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';
import { PersonsComponent } from './components/persons/persons.component';
import { PersonCreateComponent } from './components/person-create/person-create.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PersonFormComponent } from './components/person-form/person-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    PersonsComponent,
    PersonCreateComponent,
    PersonEditComponent,
    NotFoundComponent,
    PersonFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'persons/create',
        component: PersonCreateComponent
      },
      {
        path: 'persons/:id',
        component: PersonEditComponent
      },
      {
        path: 'persons',
        component: PersonsComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler},
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
