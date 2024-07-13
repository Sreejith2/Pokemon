import React from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'

function App() {
  return (
    <div className='flex flex-col min-h-screen justify-between overflow-x-hidden '>
      <NavBar/>
      <Home/>
      <Footer/>
    </div>
  )
}

export default App