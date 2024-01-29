import React from 'react'
import { Button } from './components/ui/button'
import { HashRouter,Routes,Route } from 'react-router-dom'
import About from './pages/about'
import Home from './pages/home'

type Props = {}

const App = (props: Props) => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path='/' element={<Home/>}/>
        <Route element={<>Screen not found</>} />
      </Routes>
    </HashRouter>
  )
}

export default App