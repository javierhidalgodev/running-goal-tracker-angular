import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalDetailsPageComponent } from './goal-details-page.component';

describe('GoalDetailsPageComponent', () => {
  let component: GoalDetailsPageComponent;
  let fixture: ComponentFixture<GoalDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
