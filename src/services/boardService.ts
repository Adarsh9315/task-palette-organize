
import { Board } from "@/components/molecules/BoardCard";
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from '@/lib/uuid';

// Get all boards for the current user
export async function getBoards(): Promise<Board[]> {
  try {
    const { data, error } = await supabase
      .from('boards')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map((board: any) => ({
      id: board.id,
      title: board.title,
      description: board.description,
      theme: board.theme || 'default',
    }));
  } catch (error: any) {
    console.error('Error fetching boards:', error);
    throw error;
  }
}

// Get a board by ID
export async function getBoardById(id: string): Promise<Board | null> {
  try {
    const { data, error } = await supabase
      .from('boards')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No rows returned
      }
      throw error;
    }

    if (!data) return null;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      theme: data.theme || 'default',
    };
  } catch (error: any) {
    console.error('Error fetching board by ID:', error);
    throw error;
  }
}

// Create a new board
export async function createBoard(board: Omit<Board, "id">): Promise<Board> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData || !userData.user) {
      throw new Error("Authentication required");
    }
    
    const { data, error } = await supabase
      .from('boards')
      .insert([
        {
          title: board.title,
          description: board.description,
          theme: board.theme || 'default',
          user_id: userData.user.id
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      theme: data.theme || 'default',
    };
  } catch (error: any) {
    console.error('Error creating board:', error);
    throw error;
  }
}

// Update an existing board
export async function updateBoard(id: string, board: Partial<Board>): Promise<Board> {
  try {
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

    if (error) throw error;

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      theme: data.theme || 'default',
    };
  } catch (error: any) {
    console.error('Error updating board:', error);
    throw error;
  }
}

// Delete a board
export async function deleteBoard(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('boards')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error: any) {
    console.error('Error deleting board:', error);
    throw error;
  }
}
