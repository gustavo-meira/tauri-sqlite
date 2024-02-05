import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
} from '@/components';
import { useTodoForm } from './todo-form.hook';

export const TodoForm = () => {
  const { form, onSubmit } = useTodoForm();

  return (
    <Form {...form}>
      <form
        className="flex justify-center pb-4 gap-2"
        onSubmit={onSubmit}
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
