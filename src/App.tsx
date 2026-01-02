import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './componentes/navegacion/Header';
import Inicio from './paginas/Inicio';
import Tienda from './paginas/Tienda';
import Disenador from './paginas/Disenador';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/disenador" element={<Disenador />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;