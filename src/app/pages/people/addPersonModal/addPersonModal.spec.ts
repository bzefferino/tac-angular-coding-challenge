import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonModalComponent } from './addPersonModal';

describe('AddPersonModalComponent', () => {
  let component: AddPersonModalComponent;
  let fixture: ComponentFixture<AddPersonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPersonModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddPersonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
