import { FC, useCallback, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import {
  Card,
  CardBody,
  Checkbox,
  Flex,
  IconButton,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa'

import { Todo } from 'types/todo'

type TodoUnitProps = {
  todo: Todo
  onRemove: (id: number) => void
  onComplete: (todo: Todo) => void
}

export const TodoUnit: FC<TodoUnitProps> = ({
  todo: { id, title, isComplete },
  onRemove,
  onComplete,
}) => {
  const [isChecked, setIsChecked] = useState(isComplete)

  const debouncedComplete = useDebouncedCallback(
    () => onComplete({ id, title, isComplete: isChecked }),
    400
  )

  const handleComplete = useCallback(() => {
    setIsChecked((prev) => !prev)
    debouncedComplete()
  }, [debouncedComplete])

  const handleRemove = useCallback(() => {
    onRemove(id)
  }, [id, onRemove])

  return (
    <Card variant="outline" size="sm">
      <CardBody>
        <Flex alignItems="center">
          <Checkbox isChecked={isChecked} onChange={handleComplete}>
            <Text
              overflow="hidden"
              textDecoration={isChecked ? 'line-through' : 'auto'}
            >
              {title}
            </Text>
          </Checkbox>
          <Spacer />
          <IconButton
            size="sm"
            fontSize="md"
            variant="ghost"
            color="current"
            onClick={handleRemove}
            icon={<FaTrash />}
            aria-label="Remove todo"
          />
        </Flex>
      </CardBody>
    </Card>
  )
}
