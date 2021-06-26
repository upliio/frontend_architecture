import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {UserService} from '../../../services/user.service';
import {map} from 'rxjs/operators';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Router} from '@angular/router';

@Component({
  selector: 'upli-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validateForm!: FormGroup;
  pattern: [] = [];

  constructor(private fb: FormBuilder,
              private utilsService: UtilsService,
              private userService: UserService,
              private notificationService: NzNotificationService,
              private router: Router) {
  }

  ngOnInit() {

    this.utilsService.getRegexPattern().subscribe(pattern => {
      this.validateForm = this.fb.group({
        username: [null,
          [Validators.required,
            Validators.pattern(pattern['PATTERN_username']),
            Validators.minLength(pattern['MIN_LENGTH_username']),
            Validators.maxLength(pattern['MAX_LENGTH_username'])],
          usernameElem => this.userService.checkIfUsernameIsAvailable(usernameElem.value).pipe(map(res => res ? {taken: {msg: 'Username taken'}} : null))
        ],
        password: [null, [Validators.required, Validators.minLength(pattern['MIN_LENGTH_password']), Validators.maxLength(pattern['MAX_LENGTH_password'])]],
        firstname: [null, [Validators.required,
          Validators.pattern(pattern['PATTERN_firstname']),
          Validators.minLength(pattern['MIN_LENGTH_firstname']),
          Validators.maxLength(pattern['MAX_LENGTH_firstname'])]],
        lastname: [null, [Validators.required,
          Validators.pattern(pattern['PATTERN_lastname']),
          Validators.minLength(pattern['MIN_LENGTH_lastname']),
          Validators.maxLength(pattern['MAX_LENGTH_lastname'])]],
        email: [null,
          [Validators.required,
            Validators.email,
            Validators.minLength(pattern['MIN_LENGTH_email']),
            Validators.maxLength(pattern['MAX_LENGTH_email'])],
          emailElem => this.userService.checkIfEmailIsAvailable(emailElem.value).pipe(map(res => res ? {taken: {msg: 'Email taken'}} : null))
        ],
        remember: [true]
      });
    });
  }

  submitForm(): void {
    /*for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }*/

    if (this.validateForm.valid) {
      this.userService.register({
        username: this.validateForm.controls['username'].value,
        firstName: this.validateForm.controls['firstname'].value,
        lastName: this.validateForm.controls['lastname'].value,
        email: this.validateForm.controls['email'].value,
        password: this.validateForm.controls['password'].value
      }).subscribe(res => {
        this.notificationService.success(`Welcome ${this.validateForm.controls['firstname'].value}`, 'Successfully registered!');
        this.userService.setToken(res.token);
        this.router.navigate(['/dashboard']);
      });
    }
  }

  getError(field: string) {
    const errors = this.validateForm.controls[field].errors;
    if (!errors)
      return;
    if (errors.taken)
      return `This ${field} is taken!`;
    if (errors.minlength)
      return `The ${field} must be at least ${errors.minlength.requiredLength} characters long!`;
    if (errors.maxlength)
      return `The ${field} must not be longer than ${errors.maxlength.requiredLength} characters!`;
    if (errors.pattern)
      return `The ${field} may only contain characters from a-z`;
  }

  usernameToLowercase() {
    this.validateForm.controls['username'].setValue(this.validateForm.controls['username'].value.toLowerCase());
  }
}
