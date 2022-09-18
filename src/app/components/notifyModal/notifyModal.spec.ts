import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyModalComponent } from './notifyModal';

describe('ShowErrorComponent', () => {
  let component: NotifyModalComponent;
  let fixture: ComponentFixture<NotifyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotifyModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NotifyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
