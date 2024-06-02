import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ShoppingCart from "./components/ShoppingCart";
import NavBar from "./components/NavBar";
import Catalogue from "./components/Catalogue";
import Perfil from "./components/Perfil";
import PersonalizarPastel from "./components/PersonalizarPastel";
import ProductDetails from "./components/ProductDetails";
import Eventos from "./components/eventos";


// Importar el contexto del carrito y el proveedor del carrito
import { CartProvider } from "./components/context/CartContext";

import VerPedidos from "./components/VerPedidos";


function App() {
  return (
    <BrowserRouter>

      <CartProvider> {/* Wrap the application with CartProvider */}
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
      </CartProvider>

      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<ShoppingCart />} />
        <Route path="/catalogo" element={<Catalogue />} />
        <Route path="/personalizar_pastel" element={<PersonalizarPastel />} />
        <Route path="/yo" element={<Perfil />} />
        <Route path="/producto/:productId" element={<ProductDetails />} />
        <Route path="/eventos" element={<Eventos/>}></Route>
        <Route path="/verPedidos" element={<VerPedidos />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
