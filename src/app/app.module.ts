import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GoalFormComponent } from './components/forms/goal-form/goal-form.component';
import { GoalsPageComponent } from './pages/goals-page/goals-page.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { NewGoalPageComponent } from './pages/new-goal-page/new-goal-page.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GoalComponent } from './components/goal/goal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GoalDetailsPageComponent } from './pages/goal-details-page/goal-details-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GoalDetailComponent } from './components/goal/goal-detail/goal-detail.component';
import { GoalTableDetailComponent } from './components/goal/goal-detail/goal-table-detail/goal-table-detail.component';
import { ActivityComponent } from './components/forms/activity/activity.component';
import { ModalComponent } from './components/modal/modal.component';
import { KMtoEndPipe } from './pipes/kmto-end.pipe';
import { GoalCompleteModalComponent } from './components/goal/goal-detail/goal-complete-modal/goal-complete-modal.component';
import { ErrorMessageDirective } from './directives/error-message.directive';
import { RegisterDbjsonFormComponent } from './components/forms/register-dbjson-form/register-dbjson-form.component';
import { LoginDbjsonFormComponent } from './components/forms/login-dbjson-form/login-dbjson-form.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ValidationContainerComponent } from './components/validation-container/validation-container.component';
import { OnButtonSpinnerDirective } from './directives/on-button-spinner.directive';
import { InputStylesDirective } from './directives/input-styles.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    HomePageComponent,
    GoalFormComponent,
    GoalsPageComponent,
    NavigationComponent,
    DashboardComponent,
    NotFoundPageComponent,
    NewGoalPageComponent,
    GoalComponent,
    GoalDetailsPageComponent,
    GoalDetailComponent,
    GoalTableDetailComponent,
    ActivityComponent,
    ModalComponent,
    KMtoEndPipe,
    GoalCompleteModalComponent,
    ErrorMessageDirective,
    RegisterDbjsonFormComponent,
    LoginDbjsonFormComponent,
    NotificationComponent,
    ValidationContainerComponent,
    OnButtonSpinnerDirective,
    InputStylesDirective,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    KMtoEndPipe
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
