import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService as PeopleService } from 'src/app/services/people.service';
import { Person } from 'src/app/models/person';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifyModalHelper } from 'src/app/components/notifyModal/notifyModal';

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
    private notifyModalHelper: NotifyModalHelper,
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

      // Get the id passed through as a parameter
      this.route.paramMap.subscribe(x => {
        let personId: string | undefined = this.route.snapshot.paramMap.get('id')?.toString();

        if (personId !== undefined && personId?.trim() !== '') {

          // Make the call to the service
          this.peopleService.getById(personId).subscribe(
            (x: Person) => {
              this.person = x;

              // Only necessary to update the form if in edit mode 
              // otherwise we are doing this in view mode.
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

  deletePerson() {
    // Get personalized title if available 
    let name: string = this.personFormGroup.controls['fullName'].value;
    if (name.trim().length === 0) {
      if (this.person) {
        name = this.person.name;
      }
      else {
        name = 'Record';
      }
    }

    this.notifyModalHelper.confirm(`Delete ${name}?`, 'Warning: this action cannot be undone.').afterClosed().subscribe(
      (confirmed: boolean) => {
        if (confirmed) {
          if (this.person) {
            this.loaded = false;
            this.peopleService.delete(this.person.id).subscribe(
              (x) => {
                this.loaded = true;
                this.router.navigateByUrl('/');
              }
            );
          }
        }
      }
    )
  }

  submit() {
    // This means they clicked the button in view mode, the button would have said
    // "Edit", so the easiest way to update the page is to just navigate. This will
    // grab the latest data for the person anyways in case someone else is making changes
    if (!this.editMode && this.person) {
      this.router.navigateByUrl(`people/${this.person.id}/edit`);
    }
    else {
      // Was using the spread operator to update the object, but because of mismatch in naming (fullName in form vs name in model)
      // it can mess up the database and have updated it to take each piece of data individually to be safe.
      if (this.person && this.personFormGroup.valid) {
        this.person.isActive = this.personFormGroup.controls['isActive'].value;
        this.person.name = this.personFormGroup.controls['fullName'].value;
        this.person.age = this.personFormGroup.controls['age'].value;
        this.person.gender = this.personFormGroup.controls['gender'].value;
        this.person.about = this.personFormGroup.controls['about'].value;

        this.loaded = false;

        this.peopleService.save(this.person).subscribe(
          (x: Person) => {
            this.loaded = true;

            this.router.navigateByUrl(`people/${x.id}`);

            // Emit complete event here to let the modal know it can close
            this.complete.emit();
          }
        );
      }
    }
  }

  return() {
    // Don't necessarily know where they came from if a bigger project,
    // so used location back. I think this is more useful.
    if (this.editMode) {
      this.location.back();
    }
    else {
      this.router.navigateByUrl('/');
    }
  }
}
