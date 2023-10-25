import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly projectsUrl = 'http://localhost:3000/projects/';
  currentProjectId!: number;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl);
  }

  getRelatedProjects(userId: number): Observable<Project[]> {
    return this.getProjects().pipe(
      map((projects: Project[]) =>
        projects.filter((project) =>
          project.relatedUsersId.find(
            (relatedUserId) => relatedUserId === userId
          )
        )
      )
    );
  }

  getRelatedProject(taskId: number): Observable<Project | undefined> {
    return this.getProjects().pipe(
      map((projects: Project[]) =>
        projects.find((project) =>
          project.relatedTasksId.find(
            (relatedTaskId) => relatedTaskId === taskId
          )
        )
      )
    );
  }

  setCurrentProjectId(currentProjectId: number) {
    this.currentProjectId = currentProjectId;
  }
}
