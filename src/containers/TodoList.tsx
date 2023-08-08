import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import {
  Alert,
  Input,
  Stack,
  useToast,
  AlertIcon,
  Container,
  FormControl,
  CircularProgress,
} from '@chakra-ui/react'

import { TodoUnit } from 'components/TodoUnit/TodoUnit'
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useCompleteTodoMutation,
} from 'store/api/todo.api'
import { Todo } from 'types/todo'

export const TodoList = () => {
  const toast = useToast()

  const {
    data: todos,
    isError: isTodosError,
    isLoading: isTodosLoading,
  } = useGetTodosQuery()
  const [createTodo] = useCreateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  const [completeTodo] = useCompleteTodoMutation()

  const [todoTitle, setTodoTitle] = useState<string>('')

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value)
  }, [])

  const handleCreate = useCallback(
    async (event: KeyboardEvent<HTMLInputElement>) => {
      const newTodo = todoTitle.trim()
      if (newTodo && event.key === 'Enter') {
        const responce = await createTodo(newTodo)
        if ('data' in responce) {
          toast({
            title: 'Task has been created',
            status: 'success',
          })
          setTodoTitle('')
        } else {
          toast({
            title: 'Task has not been created',
            status: 'error',
          })
        }
      }
    },
    [toast, todoTitle, createTodo]
  )

  const handleRemove = useCallback(
    async (id: number) => {
      const responce = await deleteTodo(id)
      if ('data' in responce) {
        toast({
          title: 'Task has been deleted',
          status: 'success',
        })
      } else {
        toast({
          title: 'Task has not been deleted',
          status: 'error',
        })
      }
    },
    [toast, deleteTodo]
  )

  const handleComplete = useCallback(
    async (todo: Todo) => {
      await completeTodo(todo)
    },
    [completeTodo]
  )

  return (
    <Container sx={{ py: 6 }}>
      <FormControl>
        <Input
          placeholder="Add a new task"
          value={todoTitle}
          onChange={handleChange}
          onKeyDown={handleCreate}
        />
      </FormControl>
      <Stack sx={{ mt: 6 }}>
        {isTodosError && (
          <Alert status="error">
            <AlertIcon />
            There was an error processing your request
          </Alert>
        )}
        {isTodosLoading && (
          <CircularProgress isIndeterminate size={8} sx={{ mx: 'auto' }} />
        )}
        {todos?.map((todo) => (
          <TodoUnit
            key={todo.id}
            todo={todo}
            onRemove={handleRemove}
            onComplete={handleComplete}
          />
        ))}
      </Stack>
    </Container>
  )
}
