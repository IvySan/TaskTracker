import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {}

  onLogOut() {
    this.authService.changeLoggedIn();
    this.router.navigate(['/log-in']);
  }

  onNavigate() {
    this.router.navigate(['']);
  }

  onClickTasks() {
    this.router.navigate(['/my-tasks']);
  }

  onClickProjects() {
    this.router.navigate(['/my-projects']);
  }

  onClickWorkReport() {
    this.router.navigate(['/work-report']);
  }
}
