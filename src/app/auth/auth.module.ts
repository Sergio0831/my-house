import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

const routes: Routes = [{ path: 'register', component: RegisterComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgOptimizedImage,
    AngularSvgIconModule.forRoot(),
  ],
  exports: [RouterModule],
  declarations: [RegisterComponent, AuthFormComponent],
})
export class AuthModule {}
