import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  data: any;
  users: User[] = [];
  currentUser!: User;
  registerForm!: FormGroup;
  errMessage1!: string;
  errMessage2!: string;
  errMessage3!: string;
  errMessage4!: string;
  private currentUserEmail: string = '';
  private currentUserPassword: string = '';
  today = new Date(Date.now());

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  onInputEmailChangeValue(event: Event) {
    this.currentUserEmail = (event.target as HTMLInputElement).value;
  }

  onInputPasswordChangeValue(event: Event) {
    this.currentUserPassword = (event.target as HTMLInputElement).value;
  }
  onSubmit() {
    
    if (this.registerForm.status === 'INVALID') {
      if (
        this.registerForm.controls?.['firstName'].errors?.['required'] === true
      ) {
        this.errMessage1 = '*Please enter your first name.';
      }
      if (
        this.registerForm.controls?.['lastName'].errors?.['required'] === true
      ) {
        this.errMessage2 = '*Please enter your last name.';
      }
      if (this.registerForm.controls?.['email'].errors?.['required'] === true)
        this.errMessage3 = '*Please enter your email.';
      else if (this.registerForm.controls?.['email'].errors?.['email'] === true)
        this.errMessage3 = '*The entered email is not valid.';
      if (
        this.registerForm.controls?.['password'].errors?.['required'] === true
      )
        this.errMessage4 = '*Please enter your password.';
      return;
    }

    //jos jednom proverimo da li je forma validna pre nego sto komuniciramo sa serverom
    if (!this.registerForm.valid) {
      window.alert('Not valid!');
      return;
    }

    this.data = {
      firstName: this.registerForm.controls?.['firstName'].value,
      lastName: this.registerForm.controls?.['lastName'].value,
      createdAt: `${this.today.getDate()}.${
        this.today.getMonth() + 1
      }.${this.today.getFullYear()}`,
      updatedAt: `${this.today.getDate()}.${
        this.today.getMonth() + 1
      }.${this.today.getFullYear()}`,
      password: this.registerForm.controls?.['password'].value,
      email: this.registerForm.controls?.['email'].value,
      relatedTasksId: [],
    };

    this.userService.addUser(this.data).subscribe((user) => {
      alert('User added successfully');
      this.userService.setCurrentUserId(user.id);
      this.authService.changeLoggedIn();
      this.router.navigate(['']);
    });
  }

  onLogin() {
    this.router.navigate(['/log-in']);
  }
}
