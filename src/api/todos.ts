import { getDb } from '../db';
import { DatabaseTodo, Todo } from '../types/Todo';

const selectAll = async (): Promise<Todo[]> => {
  const db = await getDb();

  const todos = await db.select<DatabaseTodo[]>('SELECT * from todo');

  await db.close();

  return todos.map((todo) => ({ ...todo, completed: Boolean(todo.completed) }));
};

type InsertTodo = {
  text: string;
};

const insert = async ({ text }: InsertTodo): Promise<Todo> => {
  const db = await getDb();

  const { lastInsertId } = await db.execute(
    'INSERT INTO todo (text, completed) VALUES ($1, $2)',
    [text, 0]
  );

  await db.close();

  return {
    id: lastInsertId,
    completed: false,
    text,
  };
};

type UpdateCompletedTodo = {
  id: number;
  completed: boolean;
};

const updateCompleted = async ({
  id,
  completed,
}: UpdateCompletedTodo): Promise<boolean> => {
  const db = await getDb();

  await db.execute('UPDATE todo SET completed = $1 WHERE id = $2', [
    completed ? 1 : 0,
    id,
  ]);

  await db.close();

  return !completed;
};

type DeleteTodo = {
  id: number;
};

const deleteOne = async ({ id }: DeleteTodo) => {
  const db = await getDb();

  await db.execute('DELETE FROM todo WHERE id = $1', [id]);

  await db.close();

  return id;
};

export const todoApi = {
  selectAll,
  insert,
  updateCompleted,
  delete: deleteOne,
};
