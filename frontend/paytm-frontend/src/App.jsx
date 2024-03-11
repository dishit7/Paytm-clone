import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import SendMoney from './components/SendMoney'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup /> } />
          <Route path="/signin" element={<Signin />}  /> 
          <Route path="/dashboard" element={<Dashboard />}/> 
          <Route path="/send" element={<SendMoney />} /> 
      
        </Routes>


      </BrowserRouter>
    </>
  )
}

export default App
