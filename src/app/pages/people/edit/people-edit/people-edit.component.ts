import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PeopleService as PeopleService } from 'src/app/services/people.service';
import { Person } from 'src/app/models/person';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-people-edit',
  templateUrl: './people-edit.component.html',
  styleUrls: ['./people-edit.component.scss']
})
export class PeopleEditComponent implements OnInit {

  constructor(
    private location: Location,
    private peopleService: PeopleService,
    private route: ActivatedRoute,
  ) { }

  private personId: string | undefined = '';
  private person: Person | undefined;

  personFormGroup: FormGroup = new FormGroup({
    isActive: new FormControl(false),
    age: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(110)]), // Min 18, Max 110
    fullName: new FormControl('', [Validators.required, Validators.maxLength(70)]),
    about: new FormControl('', [Validators.maxLength(250)]),
    gender: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.route.paramMap.subscribe(x => {

      this.personId = this.route.snapshot.paramMap.get('id')?.toString();

      if (this.personId) {

        this.peopleService.getById(this.personId).subscribe(
          (x: Person) => {

            // I could type this as a Person, but i don't know where the data is coming from and if i want to upo
            this.person = x;

            this.personFormGroup.patchValue({
              isActive: x.isActive,
              age: x.age,
              gender: x.gender,
              fullName: x.name,
              about: x.about,
            });

            this.personFormGroup.markAllAsTouched();


            console.log('person: ', x);
          }
        )
      }
    });
  }

  return() {
    // Don't necessarily know where they came from if a bigger project.
    this.location.back();
  }

  save(formData: any) {
    console.log(formData);
  }

}
