export interface Project {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  relatedTasksId: number[];
  relatedUsersId: number[];
}
