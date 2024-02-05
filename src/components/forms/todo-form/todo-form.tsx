import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '@/api';
import { Todo } from '@/types';
import {
  TodoFormSchemaInput,
  TodoFormSchemaOutput,
  todoFormSchema,
} from './todo-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
} from '@/components';

export const TodoForm = () => {
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

  const onSubmit = (data: TodoFormSchemaOutput) => {
    insertTodo(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="flex justify-center pb-4 gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter a todo..."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">New Todo</Button>
      </form>
    </Form>
  );
};
