import { useState } from 'react';
import './App.css';
import { todoApi } from './api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Todo } from './types/Todo';

function App() {
  const [todoText, setTodoText] = useState('');
  const queryClient = useQueryClient();

  const { data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.selectAll,
  });

  const { mutate: insertTodo } = useMutation({
    mutationFn: todoApi.insert,
    onSuccess: (data) => {
      queryClient.setQueryData(['todos'], (oldTodos: Todo[]) => [
        ...oldTodos,
        data,
      ]);
    },
  });

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

  if (!todos) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <form
        className="row"
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
        <button type="submit">Greet</button>
      </form>

      <div className="row">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <label>
                {todo.text}{' '}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    updateCompleted({ id: todo.id, completed: !todo.completed })
                  }
                />
              </label>
              <button onClick={() => deleteTodo({ id: todo.id })}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
