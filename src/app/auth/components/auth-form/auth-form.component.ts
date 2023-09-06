import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  @Input() title = 'Signup';
  @Input() showRepeatPassword = true;
  @Input() passwordPlaceholder = 'Create Password';

  @Output() formSubmit = new EventEmitter<any>();

  email: string = '';
  password: string = '';
  repeatPassword: string = '';

  onSubmit() {
    if (this.showRepeatPassword) {
      this.formSubmit.emit({
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword,
      });
    } else {
      this.formSubmit.emit({
        email: this.email,
        password: this.password,
      });
    }
  }
}
