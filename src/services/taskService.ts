
import { supabase } from '@/integrations/supabase/client';
import { Task, TaskStatus, TaskPriority, Subtask } from '@/types/task';

export async function getTasks(boardId: string): Promise<Task[]> {
  try {
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
      status: task.status as TaskStatus,
      boardId: task.board_id,
      priority: task.priority as TaskPriority,
      dueDate: task.due_date,
      assignedTo: task.assigned_to,
      comments: task.comments || 0,
      attachments: task.attachments || 0,
    }));
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export async function getTask(taskId: string): Promise<Task> {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .single();

    if (error) {
      console.error('Error fetching task:', error);
      throw new Error(error.message);
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      status: data.status as TaskStatus,
      boardId: data.board_id,
      priority: data.priority as TaskPriority,
      dueDate: data.due_date,
      assignedTo: data.assigned_to,
      comments: data.comments || 0,
      attachments: data.attachments || 0,
    };
  } catch (error: any) {
    console.error('Error fetching task:', error);
    throw error;
  }
}

export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData || !userData.user) {
      throw new Error("Authentication required");
    }
    
    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        title: task.title,
        description: task.description,
        status: task.status as TaskStatus,
        board_id: task.boardId,
        priority: task.priority as TaskPriority,
        due_date: task.dueDate,
        assigned_to: task.assignedTo || [],
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
      status: data.status as TaskStatus,
      boardId: data.board_id,
      priority: data.priority as TaskPriority,
      dueDate: data.due_date,
      assignedTo: data.assigned_to,
      comments: data.comments || 0,
      attachments: data.attachments || 0,
    };
  } catch (error: any) {
    console.error('Error creating task:', error);
    throw error;
  }
}

export async function updateTask(id: string, task: Partial<Task>): Promise<Task> {
  try {
    const updateData: any = {};
    
    if (task.title !== undefined) updateData.title = task.title;
    if (task.description !== undefined) updateData.description = task.description;
    if (task.status !== undefined) updateData.status = task.status as TaskStatus;
    if (task.boardId !== undefined) updateData.board_id = task.boardId;
    if (task.priority !== undefined) updateData.priority = task.priority as TaskPriority;
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
      status: data.status as TaskStatus,
      boardId: data.board_id,
      priority: data.priority as TaskPriority,
      dueDate: data.due_date,
      assignedTo: data.assigned_to,
      comments: data.comments || 0,
      attachments: data.attachments || 0,
    };
  } catch (error: any) {
    console.error('Error updating task:', error);
    throw error;
  }
}

export async function deleteTask(id: string): Promise<void> {
  try {
    // First delete any subtasks associated with the task
    const { error: subtasksError } = await supabase
      .from('subtasks')
      .delete()
      .eq('task_id', id);

    if (subtasksError) {
      console.error('Error deleting subtasks:', subtasksError);
      throw new Error(subtasksError.message);
    }
    
    // Then delete the task itself
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting task:', error);
      throw new Error(error.message);
    }
  } catch (error: any) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

export async function getSubtasks(taskId: string): Promise<Subtask[]> {
  try {
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
      completed: subtask.completed || false,
      taskId: subtask.task_id,
    }));
  } catch (error: any) {
    console.error('Error fetching subtasks:', error);
    throw error;
  }
}

export async function createSubtask(subtask: Omit<Subtask, 'id'>): Promise<Subtask> {
  try {
    const { data, error } = await supabase
      .from('subtasks')
      .insert([{
        title: subtask.title,
        completed: subtask.completed || false,
        task_id: subtask.taskId,
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
      completed: data.completed || false,
      taskId: data.task_id,
    };
  } catch (error: any) {
    console.error('Error creating subtask:', error);
    throw error;
  }
}

export async function updateSubtaskStatus(id: string, completed: boolean): Promise<void> {
  try {
    const { error } = await supabase
      .from('subtasks')
      .update({ completed })
      .eq('id', id);

    if (error) {
      console.error('Error updating subtask:', error);
      throw new Error(error.message);
    }
  } catch (error: any) {
    console.error('Error updating subtask:', error);
    throw error;
  }
}

export async function deleteSubtask(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('subtasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting subtask:', error);
      throw new Error(error.message);
    }
  } catch (error: any) {
    console.error('Error deleting subtask:', error);
    throw error;
  }
}
