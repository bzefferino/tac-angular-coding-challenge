import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService as PeopleService } from 'src/app/services/people.service';
import { Person } from 'src/app/models/person';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'people',
  templateUrl: './peopleViewEdit.html',
  styleUrls: ['./peopleViewEdit.scss']
})

// This component allows for use in a modal which you can add a new Person (addPersonView Input),
// or it can be used on a page to edit or view a person. 
export class PeopleComponent implements OnInit {

  constructor(
    private location: Location,
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  @Input() addPersonView: boolean = false;
  @Output() complete: EventEmitter<boolean> = new EventEmitter(true);

  public loaded: boolean = false;
  public editMode: boolean = false;

  public person: Person | undefined;

  personFormGroup: FormGroup = new FormGroup({
    isActive: new FormControl(true),
    age: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(110)]),
    fullName: new FormControl('', [Validators.required, Validators.maxLength(70)]),
    about: new FormControl('', [Validators.maxLength(250)]),
    gender: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    if (this.addPersonView) {
      // in a modal.. adding a new person.
      this.loaded = true;
      this.editMode = true;
      this.person = this.peopleService.getBlankPerson()
    }
    else {
      if (this.router.url.includes('edit')) {
        this.editMode = true;
      }

      this.route.paramMap.subscribe(x => {
        let personId = this.route.snapshot.paramMap.get('id')?.toString();

        if (personId !== undefined && personId?.trim() !== '') {
          this.peopleService.getById(personId).subscribe(
            (x: Person) => {
              this.person = x;

              // Only necessary to update the form if in edit mode.
              if (this.editMode) {
                this.personFormGroup.patchValue({
                  isActive: x.isActive,
                  age: x.age,
                  gender: x.gender,
                  fullName: x.name,
                  about: x.about,
                });

                this.personFormGroup.markAllAsTouched();
              }
              this.loaded = true;
            }
          )
        }
      });
    }
  }

  return() {
    // Don't necessarily know where they came from if a bigger project.
    if (this.editMode) {
      this.location.back();
    }
    else {
      this.router.navigateByUrl('/');
    }
  }

  submit() {
    if (!this.editMode && this.person) {
      this.router.navigateByUrl(`people/${this.person.id}/edit`);
    }
    else {
      // Was using the spread operator to update the object, but because of mismatch in naming (fullName in form vs name in model)
      // it can mess up the database and have updated it to take each piece of data individually to be more safe.
      if (this.person && this.personFormGroup.valid) {
        this.person.isActive = this.personFormGroup.controls['isActive'].value;
        this.person.name = this.personFormGroup.controls['fullName'].value;
        this.person.age = this.personFormGroup.controls['age'].value;
        this.person.gender = this.personFormGroup.controls['gender'].value;
        this.person.about = this.personFormGroup.controls['about'].value;

        this.peopleService.save(this.person).subscribe(
          (x: Person) => {
            this.router.navigateByUrl(`people/${x.id}`);
            this.complete.emit();
          }
        );
      }
    }
  }
}
