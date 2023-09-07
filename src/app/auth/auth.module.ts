import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedLayoutComponent } from './components/shared-layout/shared-layout.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'signup', component: RegisterComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgOptimizedImage,
    AngularSvgIconModule.forRoot(),
  ],
  exports: [RouterModule],
  declarations: [
    RegisterComponent,
    AuthFormComponent,
    SharedLayoutComponent,
    LoginComponent,
  ],
})
export class AuthModule {}
