import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '@/api';
import { Todo } from '@/types';
import { cn } from '@/lib/utils';
import { Button, Card, Checkbox, Label } from '@/components';

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
    <Card className="flex justify-between bg-blue-700 p-2">
      <Label
        className={cn('text-white text-lg flex items-center hover:opacity-80', {
          'line-through': props.todo.completed,
        })}
      >
        <Checkbox
          checked={props.todo.completed}
          className="mr-2 h-6 w-6"
          onClick={() =>
            updateCompleted({
              id: props.todo.id,
              completed: !props.todo.completed,
            })
          }
        />
        {props.todo.text}
      </Label>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => deleteTodo({ id: props.todo.id })}
      >
        X
      </Button>
    </Card>
  );
};
