import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ShoppingCart from "./components/ShoppingCart";
import NavBar from "./components/NavBar"
import Catalogue from "./components/Catalogue";
import Perfil from "./components/Perfil";

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route Component={Home} path='/'/>
        <Route Component={ShoppingCart} path='/shoppingcart' />
        <Route Component={Catalogue} path='/catalogue' />
        <Route Component={Perfil} path='/yo' />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
