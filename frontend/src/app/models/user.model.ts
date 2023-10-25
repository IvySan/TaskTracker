export interface User {
  id: number;
  email: string;
  password?: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  updatedAt: string;
  relatedTasksId: number[];
  //relatedProjectsId: number[];
}
