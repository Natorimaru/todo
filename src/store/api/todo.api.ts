import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Todo } from 'types/todo'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => ({
        url: '/todo',
      }),
      providesTags: ['Todos'],
    }),
    createTodo: builder.mutation<Todo, string>({
      query: (title: string) => ({
        url: '/todo',
        method: 'POST',
        body: { title, isComplete: false },
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `/todo/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
    completeTodo: builder.mutation<Todo, Todo>({
      query: (todo: Todo) => ({
        url: `/todo/${todo.id}`,
        method: 'PUT',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
})

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useCompleteTodoMutation,
} = todoApi
