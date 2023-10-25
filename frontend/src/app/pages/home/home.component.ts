import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser?: User;
  relatedTasks: Task[] = [];
  sub1!: Subscription;
  sub2!: Subscription;

  constructor(
    private userService: UserService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.sub1 = this.userService
      .getUser(this.userService.currentUserId)
      .subscribe((user) => {this.currentUser = user});

    this.sub2 = this.taskService
      .getRelatedTasks(this.userService.currentUserId)
      .subscribe((tasks) => {this.relatedTasks = tasks});
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}


