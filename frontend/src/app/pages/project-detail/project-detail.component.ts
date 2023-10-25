import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  project?: Project;
  currentProjectId?: number;
  sub!: Subscription;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.sub = this.projectService
      .getRelatedProject(this.taskService.currentTaskId)
      .subscribe(
        (project) => (
          (this.project = project), (this.currentProjectId = this.project?.id)
        )
      );

    if (this.currentProjectId == undefined) return;
    else this.projectService.setCurrentProjectId(this.currentProjectId);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
