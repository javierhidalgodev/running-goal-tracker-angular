import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalCompleteModalComponent } from './goal-complete-modal.component';

describe('GoalCompleteModalComponent', () => {
  let component: GoalCompleteModalComponent;
  let fixture: ComponentFixture<GoalCompleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalCompleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalCompleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
