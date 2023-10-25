export interface Task {
  id: number;
  taskStatus: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  relatedUsersId: number[];
  relatedProjectId: number;
  dates?: number[];
  times?: number[];
  totalTime: number;
}
