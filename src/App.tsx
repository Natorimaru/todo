import { TodoList } from 'containers/TodoList'
import { ColorModeSwitcher } from 'components/ColorModeSwitcher/ColorModeSwitcher'

export const App = () => {
  return (
    <>
      <TodoList />
      <ColorModeSwitcher />
    </>
  )
}
