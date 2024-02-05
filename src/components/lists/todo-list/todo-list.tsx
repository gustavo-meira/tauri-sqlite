import { TodoCard } from '@/components';
import { useTodoList } from './todo-list.hook';

export const TodoList = () => {
  const { todos } = useTodoList();

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
