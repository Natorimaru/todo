import { extendTheme, ToastProviderProps } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: `'Jost', sans-serif`,
    body: `'Jost', sans-serif`,
  },
})

export const toastOptions: ToastProviderProps = {
  defaultOptions: {
    duration: 2000,
    isClosable: false,
    position: 'top-right',
  },
}
