
import { supabase } from '@/integrations/supabase/client';
import { Column } from '@/recoil/atoms/columnsAtom';

export async function getColumns(boardId: string): Promise<Column[]> {
  const { data, error } = await supabase
    .from('columns')
    .select('*')
    .eq('board_id', boardId)
    .order('column_order', { ascending: true });

  if (error) {
    console.error('Error fetching columns:', error);
    throw new Error(error.message);
  }

  return data.map(column => ({
    id: column.id,
    title: column.title,
    status: column.status,
    color: column.color || 'bg-gray-500',
    textColor: `text-${column.color?.split('-')[1] || 'gray'}-500`,
  }));
}

export async function createColumn(column: Omit<Column, 'id'>, boardId: string): Promise<Column> {
  const { data, error } = await supabase
    .from('columns')
    .insert([{
      title: column.title,
      status: column.status,
      color: column.color,
      board_id: boardId,
      column_order: column.columnOrder || 0,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating column:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    title: data.title,
    status: data.status,
    color: data.color,
    textColor: `text-${data.color?.split('-')[1] || 'gray'}-500`,
  };
}

export async function updateColumn(id: string, column: Partial<Column>): Promise<Column> {
  const { data, error } = await supabase
    .from('columns')
    .update({
      title: column.title,
      status: column.status,
      color: column.color,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating column:', error);
    throw new Error(error.message);
  }

  return {
    id: data.id,
    title: data.title,
    status: data.status,
    color: data.color,
    textColor: `text-${data.color?.split('-')[1] || 'gray'}-500`,
  };
}

export async function deleteColumn(id: string): Promise<void> {
  const { error } = await supabase
    .from('columns')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting column:', error);
    throw new Error(error.message);
  }
}
