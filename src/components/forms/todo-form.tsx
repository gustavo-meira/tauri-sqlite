import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '@/api';
import { Todo } from '@/types';

export const TodoForm = () => {
  const [todoText, setTodoText] = useState('');
  const queryClient = useQueryClient();
  const { mutate: insertTodo } = useMutation({
    mutationFn: todoApi.insert,
    onSuccess: (data) => {
      queryClient.setQueryData(['todos'], (oldTodos: Todo[]) => [
        ...oldTodos,
        data,
      ]);
    },
  });

  return (
    <form
      className="flex justify-center pb-4 gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        insertTodo({ text: todoText });
        setTodoText('');
      }}
    >
      <input
        onChange={(e) => setTodoText(e.currentTarget.value)}
        placeholder="Enter a todo..."
      />
      <button type="submit">New Todo</button>
    </form>
  );
};
