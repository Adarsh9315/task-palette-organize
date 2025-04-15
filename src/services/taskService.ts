
import { supabase } from '@/integrations/supabase/client';
import { Task, Subtask } from '@/components/molecules/TaskCard';

export async function getTasks(boardId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('board_id', boardId);

  if (error) {
    console.error('Error fetching tasks:', error);
    throw new Error(error.message);
  }

  return data.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    boardId: task.board_id,
    priority: task.priority,
    dueDate: task.due_date,
    assignedTo: task.assigned_to,
    comments: task.comments,
    attachments: task.attachments,
  }));
}

export async function getSubtasks(taskId: string): Promise<Subtask[]> {
  const { data, error } = await supabase
    .from('subtasks')
    .select('*')
    .eq('task_id', taskId);

  if (error) {
    console.error('Error fetching subtasks:', error);
    throw new Error(error.message);
  }

  return data.map(subtask => ({
    id: subtask.id,
    title: subtask.title,
    completed: subtask.completed,
  }));
}

export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{
      title: task.title,
      description: task.description,
      status: task.status,
      board_id: task.boardId,
      priority: task.priority,
      due_date: task.dueDate,
      assigned_to: task.assignedTo,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating task:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    status: data.status,
    boardId: data.board_id,
    priority: data.priority,
    dueDate: data.due_date,
    assignedTo: data.assigned_to,
    comments: data.comments,
    attachments: data.attachments,
  };
}

export async function createSubtask(subtask: Omit<Subtask, 'id'>, taskId: string): Promise<Subtask> {
  const { data, error } = await supabase
    .from('subtasks')
    .insert([{
      title: subtask.title,
      completed: subtask.completed || false,
      task_id: taskId,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating subtask:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    title: data.title,
    completed: data.completed,
  };
}

export async function updateTask(id: string, task: Partial<Task>): Promise<Task> {
  const updateData: any = {};
  
  if (task.title !== undefined) updateData.title = task.title;
  if (task.description !== undefined) updateData.description = task.description;
  if (task.status !== undefined) updateData.status = task.status;
  if (task.priority !== undefined) updateData.priority = task.priority;
  if (task.dueDate !== undefined) updateData.due_date = task.dueDate;
  if (task.assignedTo !== undefined) updateData.assigned_to = task.assignedTo;
  
  const { data, error } = await supabase
    .from('tasks')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating task:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    status: data.status,
    boardId: data.board_id,
    priority: data.priority,
    dueDate: data.due_date,
    assignedTo: data.assigned_to,
    comments: data.comments,
    attachments: data.attachments,
  };
}

export async function updateSubtask(id: string, subtask: Partial<Subtask>): Promise<Subtask> {
  const { data, error } = await supabase
    .from('subtasks')
    .update({
      title: subtask.title,
      completed: subtask.completed,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating subtask:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    title: data.title,
    completed: data.completed,
  };
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting task:', error);
    throw new Error(error.message);
  }
}

export async function deleteSubtask(id: string): Promise<void> {
  const { error } = await supabase
    .from('subtasks')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting subtask:', error);
    throw new Error(error.message);
  }
}
