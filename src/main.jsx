import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StoreProvider } from './Context/Store.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Regsiter/Register.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/home' element={<App />}/>
      </Routes>
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>,
)
