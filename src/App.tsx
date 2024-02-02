import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import { invoke } from '@tauri-apps/api/tauri';
import './App.css';
import Database from 'tauri-plugin-sql-api';

type DatabaseTodo = {
  id: number;
  title: string;
  completed: number;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const createTodo = async () => {
    const db = await Database.load('sqlite:test.db');

    const newTodo = await db.execute(
      'INSERT INTO todo (text, completed) VALUES (?, ?)',
      [todoText, 0]
    );

    setTodos([
      ...todos,
      { id: newTodo.lastInsertId, title: todoText, completed: false },
    ]);
    setTodoText('');
  };

  useEffect(() => {
    (async () => {
      const db = await Database.load('sqlite:test.db');

      const todos = await db.select<DatabaseTodo[]>('SELECT * FROM todo');

      setTodos(
        todos.map((todo) => ({ ...todo, completed: Boolean(todo.completed) }))
      );
    })();
  }, []);

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a
          href="https://vitejs.dev"
          target="_blank"
        >
          <img
            src="/vite.svg"
            className="logo vite"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://tauri.app"
          target="_blank"
        >
          <img
            src="/tauri.svg"
            className="logo tauri"
            alt="Tauri logo"
          />
        </a>
        <a
          href="https://reactjs.org"
          target="_blank"
        >
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          createTodo();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setTodoText(e.currentTarget.value)}
          placeholder="Enter a todo..."
        />
        <button type="submit">Greet</button>
      </form>

      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  );
}

export default App;
