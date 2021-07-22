import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {ChakraProvider} from '@chakra-ui/react'
import {QueryClientProvider,QueryClient} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import {Provider} from 'react-redux'
import  store  from 'Redux/store'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Provider store={store}>
          <App />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)


