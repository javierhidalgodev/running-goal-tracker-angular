import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GoalsPageComponent } from './pages/goals-page/goals-page.component';
import { authGuard } from './guards/auth.guard';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { NewGoalPageComponent } from './pages/new-goal-page/new-goal-page.component';
import { GoalDetailsPageComponent } from './pages/goal-details-page/goal-details-page.component';
import { AuthGuard, canActivate, redirectUnauthorizedTo,redirectLoggedInTo } from '@angular/fire/auth-guard'

const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(['/auth/login'])

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    // canActivate: [authGuard],
    ...canActivate(() => redirectUnauthorizedTo(['/auth/login'])),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'new-goal',
        component: NewGoalPageComponent
      },
      {
        path: 'goals',
        component: GoalsPageComponent,
      },
      {
        path: 'goals/:id',
        component: GoalDetailsPageComponent
      }
    ]
  },
  {
    path: 'auth/:action',
    component: AuthPageComponent,
    ...canActivate(() => redirectLoggedInTo(['/home'])),
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
