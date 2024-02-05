import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodoCardProps } from './todo-card';
import { todoApi } from '@/api';

export const useTodoCard = (props: TodoCardProps) => {
  const queryClient = useQueryClient();
  const { todo } = props;

  const { mutate: updateCompleted } = useMutation({
    mutationFn: todoApi.updateCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });

  const { mutate: deleteTodo } = useMutation({
    mutationFn: todoApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });

  const deleteTodoFn = () => {
    deleteTodo({ id: todo.id });
  };

  const updateCompletedFn = () => {
    updateCompleted({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  return {
    todo,
    updateCompletedFn,
    deleteTodoFn,
  };
};
