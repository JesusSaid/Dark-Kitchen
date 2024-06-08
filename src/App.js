import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Catalogue from "./components/Catalogue";
import Perfil from "./components/Perfil";
import PersonalizarPastel from "./components/PersonalizarPastel";
import ProductDetails from "./components/ProductDetails";
import Eventos from "./components/eventos";
import VerPedidos from "./components/VerPedidos";
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogue />} />
        <Route path="/personalizar_pastel" element={<PersonalizarPastel />} />
        <Route path="/yo" element={<Perfil />} />
        <Route path="/producto/:productId" element={<ProductDetails />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/verPedidos" element={<ProtectedRoute element={VerPedidos} allowedTypes={[1]} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
