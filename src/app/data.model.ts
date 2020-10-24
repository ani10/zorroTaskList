
export interface TaskObject {
  message: string;
  due_date?: string;
  priority?: 1 | 2 | 3;
  assigned_to?: number;
}
export interface TaskUpdateObject extends TaskObject {
  taskId: number;
}
export interface TaskGetObject extends TaskObject {
  assigned_name: string,
  created_on: string,
  id: string,
}

export interface DeleteTaskObject {
  taskId: number;
}

export interface Users {
  id: number;
  name: string;
  picture: string;
}
