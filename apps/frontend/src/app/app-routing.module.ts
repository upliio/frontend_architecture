import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {StartpageWrapperComponent} from './startpage/wrapper/startpage-wrapper.component';
import {HomeComponent} from './startpage/home.component';
import {LoginComponent} from './startpage/auth/login/login.component';
import {RegisterComponent} from './startpage/auth/register/register.component';
import {ForgotPasswordComponent} from './startpage/auth/forgot-password/forgot-password.component';
import {LogoutGuard} from './logout-guard.service';
import {AuthGuard} from './auth-guard.service';
import {GuestGuard} from './guest-guard.service';
import {PricingComponent} from './startpage/pricing/pricing.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '',
      pathMatch: 'prefix',
      component: StartpageWrapperComponent,
      children: [
        {
          path: '',
          component: HomeComponent
        },
        {
          path: 'pricing',
          component: PricingComponent
        },
        {
          path: 'auth/login',
          component: LoginComponent,
          canActivate: [GuestGuard]
        },
        {
          path: 'auth/register',
          component: RegisterComponent,
          canActivate: [GuestGuard]
        },
        {
          path: 'auth/request-password',
          component: ForgotPasswordComponent,
          canActivate: [GuestGuard]
        },
        {
          path: 'auth/logout',
          canActivate: [AuthGuard, LogoutGuard],
          component: LoginComponent
        }
      ]
    },
    {
      path: 'dashboard',
      canActivate: [AuthGuard],
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    }
  ], {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
