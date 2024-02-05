import { todoApi } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useTodoList = () => {
  const { data: todos } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.selectAll,
    initialData: [],
  });

  return {
    todos,
  };
};
