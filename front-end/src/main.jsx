import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import ReactDom from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './containers/home'
import Doadores from './containers/doadores/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doadores" element={<Doadores/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)