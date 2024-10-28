import React from 'react'
import NavbarComponent from './components/navbar.js'
import Footer from './components/footer.js'
import Providers from './context/globalProviders.js'
import AppRoutes from './appRoutes.js'

function App() {
  return (
    <Providers>
      <NavbarComponent />
        <AppRoutes />
      <Footer />
    </Providers>
  )
}

export default App