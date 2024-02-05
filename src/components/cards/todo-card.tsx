import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '@/api';
import { Todo } from '@/types';
import { cn } from '@/lib/utils';

type TodoCardProps = {
  todo: Todo;
};

export const TodoCard = (props: TodoCardProps) => {
  const queryClient = useQueryClient();

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

  return (
    <div className="flex justify-between">
      <label className={cn({ 'line-through': props.todo.completed })}>
        <input
          type="checkbox"
          checked={props.todo.completed}
          className="mr-1"
          onChange={() =>
            updateCompleted({
              id: props.todo.id,
              completed: !props.todo.completed,
            })
          }
        />
        {props.todo.text}
      </label>
      <button onClick={() => deleteTodo({ id: props.todo.id })}>X</button>
    </div>
  );
};
