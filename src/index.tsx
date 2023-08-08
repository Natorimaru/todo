import React from 'react'
import ReactDOM from 'react-dom/client'
import { ColorModeScript, ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from 'react-redux'

import { theme, toastOptions } from 'theme'
import { store } from 'store/store'

import '@fontsource/jost/400.css'
import '@fontsource/jost/700.css'

import { App } from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme} toastOptions={toastOptions}>
        <App />
      </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>
)
