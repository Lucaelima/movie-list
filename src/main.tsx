import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route } from 'react-router'
import EstilosGlobais from './EstilosGlobais'
import Inicial from './pages/Inicial'
import Cabecalho from './componentes/Cabecalho'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Filme from './pages/Filme'
import { Routes } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <EstilosGlobais />
      <BrowserRouter>
        <Cabecalho />
        <Routes>
          <Route path="/" element={<Inicial />} />
          <Route path="/lista/:idRota" element={<Inicial />} />
          <Route path="/categoria/:idRota" element={<Inicial />} />
          <Route path="/filme/:idRota" element={<Filme />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
