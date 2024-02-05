import { useQuery } from '@tanstack/react-query';
import { todoApi } from '@/api';
import { TodoCard } from '../cards/todo-card';

export const TodoList = () => {
  const { data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.selectAll,
    initialData: [],
  });

  return (
    <div className="flex justify-center">
      <ul className="w-1/2">
        {todos.map((todo) => (
          <li key={todo.id}>
            <TodoCard todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
};
