import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'upli-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.userService.login({
        username: this.validateForm.controls['username'].value,
        password: this.validateForm.controls['password'].value
      }).subscribe(res => {
        localStorage.setItem('token', res.token);
        this.userService.resetUser();
        this.router.navigate(['/dashboard']);
      }, err => {
        this.validateForm.controls['password'].setErrors({
          error: true
        });
      });
    }
  }
}
