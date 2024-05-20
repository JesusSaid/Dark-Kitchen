import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ShoppingCart from "./components/ShoppingCart";
import NavBar from "./components/NavBar"
import Catalogue from "./components/Catalogue";

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route Component={Home} path='/' exact />
        <Route Component={ShoppingCart} path='/shoppingcart' />
        <Route Component={Catalogue} path='/catalogue' />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
