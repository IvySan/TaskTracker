import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errMessage1!: string;
  errMessage2!: string;
  loggedIn!: boolean;
  notRegistered!: boolean;
  users: User[] = [];

  private currentUserEmail: string = '';
  private currentUserPassword: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.loggedIn = this.authService.getLoggedIn();
    this.notRegistered = false;
  }

  ngOnInit(): void {}

  onInputEmailChangeValue(event: Event) {
    this.currentUserEmail = (event.target as HTMLInputElement).value;
  }

  onInputPasswordChangeValue(event: Event) {
    this.currentUserPassword = (event.target as HTMLInputElement).value;
  }

  onSignUp() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (this.loginForm.status === 'INVALID') {
      if (this.loginForm.controls?.['email'].errors?.['required'] === true)
        this.errMessage1 = '*Please enter your email.';
      else if (this.loginForm.controls?.['email'].errors?.['email'] === true)
        this.errMessage1 = '*The entered email is not valid.';
      if (this.loginForm.controls?.['password'].errors?.['required'] === true)
        this.errMessage2 = '*Please enter your password.';
      return;
    }

    //jos jednom proverimo da li je forma validna pre nego sto komuniciramo sa serverom
    if (!this.loginForm.valid) {
      window.alert('Not valid!');
      return;
    }

    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      users.forEach((user) => {
        if (
          user.email === this.currentUserEmail &&
          user.password === this.currentUserPassword
        ) {
          this.userService.setCurrentUserId(user.id);
          this.authService.changeLoggedIn();
          this.router.navigate(['/']);
        } else this.notRegistered = true;
      });
    });
  }
}
