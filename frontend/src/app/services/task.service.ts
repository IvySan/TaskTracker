import { Observable, map } from 'rxjs';
import { Task } from './../models/task.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly tasksUrl = 'http://localhost:3000/tasks/';
  currentTaskId: number = 0;

  relatedTasks$ = this.http
    .get<Task[]>(this.tasksUrl)
    .pipe(
      map((tasks: Task[]) =>
        tasks.filter((task) =>
          task.relatedUsersId.find(
            (relatedUserId) => relatedUserId === this.userService.currentUserId
          )
        )
      )
    );

  constructor(private userService: UserService, private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl);
  }

  getRelatedTasks(userId: number): Observable<Task[]> {
    return this.getTasks().pipe(
      map((tasks: Task[]) =>
        tasks.filter((task) =>
          task.relatedUsersId.find((relatedUserId) => relatedUserId === userId)
        )
      )
    );
  }

  getTasksRelatedByProject(projectId: number): Observable<Task[]> {
    return this.getTasks().pipe(
      map((tasks: Task[]) =>
        tasks.filter((task) => task.relatedProjectId === projectId)
      )
    );
  }

  setCurrentTaskId(currentTaskId: number) {
    this.currentTaskId = currentTaskId;
  }
}
