import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleLookupComponent } from './peopleLookup';

describe('PeopleComponent', () => {
  let component: PeopleLookupComponent;
  let fixture: ComponentFixture<PeopleLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleLookupComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
