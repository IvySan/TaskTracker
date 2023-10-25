import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css'],
})
export class MyTasksComponent {
  relatedTasks: Task[] = [];
  sub!: Subscription;

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.sub = this.taskService
      .getRelatedTasks(this.userService.currentUserId)
      .subscribe((tasks) => (this.relatedTasks = tasks));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
