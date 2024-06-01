
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ShoppingCart from "./components/ShoppingCart";
import NavBar from "./components/NavBar";
import Catalogue from "./components/Catalogue";
import Perfil from "./components/Perfil";
import PersonalizarPastel from "./components/PersonalizarPastel";
import ProductDetails from "./components/ProductDetails";
import Eventos from "./components/eventos";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<ShoppingCart />} />
        <Route path="/catalogo" element={<Catalogue />} />
        <Route path="/personalizar_pastel" element={<PersonalizarPastel />} />
        <Route path="/yo" element={<Perfil />} />
        <Route path="/producto/:productId" element={<ProductDetails />} />
        <Route path="/eventos" element={<Eventos/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
