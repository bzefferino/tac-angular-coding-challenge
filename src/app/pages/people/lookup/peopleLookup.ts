import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorModalHelper } from 'src/app/components/errorModal/errorModal.component';
import { PeopleService as PeopleService } from 'src/app/services/people.service';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'people-lookup',
  templateUrl: './peopleLookup.html',
  styleUrls: ['./peopleLookup.scss']
})
export class PeopleLookupComponent implements OnInit {

  constructor(
    private errorModalHelper: ErrorModalHelper,
    private personService: PeopleService,
    private router: Router
  ) { }

  public loaded: boolean = false;
  public dataSource: Person[] = [];

  public displayedColumns = [
    'name', 'registered', 'isActive', 'actions'
  ];

  ngOnInit(): void {
    this.personService.getAll().subscribe(
      {
        next: (x: Person[]) => {
          this.dataSource = x;
          this.loaded = true;
        },
        error: error => this.errorModalHelper.displayError(error)
      }
    )
  }

  edit(person: Person) {
    console.log('in edit... id =>', person.id);
    this.router.navigateByUrl(`people/${person.id}/edit`);
  }

}
