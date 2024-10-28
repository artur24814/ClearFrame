import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AutProvider } from './autContext.js'

const queryClient = new QueryClient()

function Providers({ children }) {
  return (
    <AutProvider>
      <Router>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Router>
    </AutProvider>
  )
}

export default Providers