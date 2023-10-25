import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  relatedUsers: User[] = [];
  sub!: Subscription;

  constructor(
    public userService: UserService,
    public taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.sub = this.userService
      .getRelatedUsers(this.taskService.currentTaskId)
      .subscribe((users) => (this.relatedUsers = users));
  }
}
