import { Subscription } from 'rxjs';
import { ProjectService } from './../../services/project.service';
import { UserService } from './../../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  relatedProjects: Project[] = [];
  sub!: Subscription;

  constructor(
    private userService: UserService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.sub = this.projectService
      .getRelatedProjects(this.userService.currentUserId)
      .subscribe((projects) => (this.relatedProjects = projects));
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
