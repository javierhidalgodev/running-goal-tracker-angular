import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalTableDetailComponent } from './goal-table-detail.component';

describe('GoalTableDetailComponent', () => {
  let component: GoalTableDetailComponent;
  let fixture: ComponentFixture<GoalTableDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalTableDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalTableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
