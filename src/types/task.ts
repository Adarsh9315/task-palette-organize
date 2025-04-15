
export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  taskId: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  boardId: string;
  priority?: TaskPriority;
  dueDate?: string;
  assignedTo?: string[];
  comments?: number;
  attachments?: number;
}
