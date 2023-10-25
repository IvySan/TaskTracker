import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersComponent } from './pages/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskComponent } from './components/task/task.component';
import { UserComponent } from './components/user/user.component';
import { ProjectComponent } from './components/project/project.component';
import { MyTasksComponent } from './pages/my-tasks/my-tasks.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { WorkReportComponent } from './pages/work-report/work-report.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    UsersComponent,
    TasksComponent,
    TaskComponent,
    UserComponent,
    ProjectComponent,
    MyTasksComponent,
    TaskListComponent,
    ProjectListComponent,
    MyProjectsComponent,
    ProjectDetailComponent,
    WorkReportComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


