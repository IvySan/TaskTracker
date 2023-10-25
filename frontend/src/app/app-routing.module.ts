import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthService } from './services/auth.service';
import { UsersComponent } from './pages/users/users.component';
import { MyTasksComponent } from './pages/my-tasks/my-tasks.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { WorkReportComponent } from './pages/work-report/work-report.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: 'log-in', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthService] },
  { path: 'my-tasks', component: MyTasksComponent },
  { path: 'my-projects', component: MyProjectsComponent },
  { path: 'users-on-task', component: UsersComponent },
  { path: 'project-detail', component: ProjectDetailComponent },
  { path: 'tasks-on-project', component: TasksComponent },
  { path: 'work-report', component: WorkReportComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService],
})
export class AppRoutingModule {}
