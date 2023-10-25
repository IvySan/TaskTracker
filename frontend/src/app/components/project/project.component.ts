import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'tr[app-project]',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  @Input('projectData')
  project?: Project;

  @Input('projectId')
  currentProjectId!: number;

  constructor(private router: Router, private projectService: ProjectService) {}

  onClick() {
    this.router.navigate(['/tasks-on-project']);
    this.projectService.setCurrentProjectId(this.currentProjectId);
  }
}
