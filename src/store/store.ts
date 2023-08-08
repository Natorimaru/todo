import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { todoApi } from './api/todo.api'

const rootReducer = combineReducers({
  [todoApi.reducerPath]: todoApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
