import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService as PeopleService } from 'src/app/services/people.service';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-people-edit',
  templateUrl: './people-edit.component.html',
  styleUrls: ['./people-edit.component.scss']
})
export class PeopleEditComponent implements OnInit {

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute,
  ) { }

  private personId: string | undefined = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(x => {

      this.personId = this.route.snapshot.paramMap.get('id')?.toString();

      if (this.personId) {

        this.peopleService.getById(this.personId).subscribe(
          (x: Person) => {
            console.log('person: ', x);
          }
        )
      }
    });
  }

}
