import { Todo } from '@/types';
import { cn } from '@/lib/utils';
import { Button, Card, Checkbox, Label } from '@/components';
import { useTodoCard } from './todo-card.hook';

export type TodoCardProps = {
  todo: Todo;
};

export const TodoCard = (props: TodoCardProps) => {
  const { todo, deleteTodoFn, updateCompletedFn } = useTodoCard(props);

  return (
    <Card className="flex justify-between bg-blue-700 p-2">
      <Label
        className={cn('text-white text-lg flex items-center hover:opacity-80', {
          'line-through': todo.completed,
        })}
      >
        <Checkbox
          checked={todo.completed}
          className="mr-2 h-6 w-6"
          onClick={updateCompletedFn}
        />
        {todo.text}
      </Label>
      <Button
        variant="destructive"
        size="sm"
        onClick={deleteTodoFn}
      >
        X
      </Button>
    </Card>
  );
};
