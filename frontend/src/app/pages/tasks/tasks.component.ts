import { Task } from 'src/app/models/task.model';
import { TaskService } from '../../services/task.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, OnDestroy {
  relatedTasks: Task[] = [];
  sub!: Subscription;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.sub = this.taskService
      .getTasksRelatedByProject(this.projectService.currentProjectId)
      .subscribe((tasks) => (this.relatedTasks = tasks));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
