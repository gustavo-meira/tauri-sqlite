import { TodoList, TodoForm } from '@/components';

function App() {
  return (
    <div className="container min-h-screen">
      <h1 className="text-4xl text-center py-4">Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
