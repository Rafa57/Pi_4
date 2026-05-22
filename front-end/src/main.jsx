import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import ReactDom from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './containers/home'
import Doadores from './containers/doadores/index.jsx'
import Cadastro from './containers/doadores/cadastro.jsx'
import Info from './containers/doadores/info.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doadores" element={<Doadores/>} />
        <Route path="/doadores/add" element={<Cadastro/>} />
        <Route path='/doadores/:id' element={<Info/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)