import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGoalPageComponent } from './new-goal-page.component';

describe('NewGoalPageComponent', () => {
  let component: NewGoalPageComponent;
  let fixture: ComponentFixture<NewGoalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewGoalPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGoalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
