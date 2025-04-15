
import { supabase } from '@/integrations/supabase/client';
import { Board } from '@/components/molecules/BoardCard';

export async function getBoards(): Promise<Board[]> {
  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching boards:', error);
    throw new Error(error.message);
  }

  return data.map(board => ({
    id: board.id,
    title: board.title,
    description: board.description,
    theme: board.theme || 'default',
  }));
}

export async function getBoardById(id: string): Promise<Board | null> {
  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // No board found
    }
    console.error('Error fetching board:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    theme: data.theme || 'default',
  };
}

export async function createBoard(board: Omit<Board, 'id'>): Promise<Board> {
  const { data, error } = await supabase
    .from('boards')
    .insert([{
      title: board.title,
      description: board.description,
      theme: board.theme || 'default',
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating board:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    theme: data.theme || 'default',
  };
}

export async function updateBoard(id: string, board: Partial<Board>): Promise<Board> {
  const { data, error } = await supabase
    .from('boards')
    .update({
      title: board.title,
      description: board.description,
      theme: board.theme,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating board:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    theme: data.theme || 'default',
  };
}

export async function deleteBoard(id: string): Promise<void> {
  const { error } = await supabase
    .from('boards')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting board:', error);
    throw new Error(error.message);
  }
}
