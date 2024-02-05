import { useForm } from 'react-hook-form';
import {
  TodoFormSchemaInput,
  TodoFormSchemaOutput,
  todoFormSchema,
} from './todo-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '@/api';
import { Todo } from '@/types';

export const useTodoForm = () => {
  const form = useForm<TodoFormSchemaInput, any, TodoFormSchemaOutput>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      text: '',
    },
  });

  const queryClient = useQueryClient();
  const { mutate: insertTodo } = useMutation({
    mutationFn: todoApi.insert,
    onSuccess: (data) => {
      queryClient.setQueryData(['todos'], (oldTodos: Todo[]) => [
        ...oldTodos,
        data,
      ]);
    },
  });

  const onSubmit = form.handleSubmit((data: TodoFormSchemaOutput) => {
    insertTodo(data);
    form.reset();
  });

  return {
    onSubmit,
    form,
  };
};
