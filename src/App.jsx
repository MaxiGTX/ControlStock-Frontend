import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Register from './pages/Register';
import RegistroSuccess from './pages/RegistroSuccess';
import Navbar from './components/navbar';
import Login from './pages/Login';
import Apps from './pages/Home';
import AdminDashboard from './pages/AdminProduct';
import AdminUsers from './pages/AdminUsers';
import ProductDetails from './pages/ProductDetails';
import Carrito from './pages/Carrito';
import Footer from './components/Footer';
import NotFound from "./pages/Error404";
import Nosotros from "./pages/Nosotros"
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [jwt, setJwt] = useState(localStorage.getItem("token") || "");
  const [role, setIsAdmin] = useState(false);
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const verifyEmployee = () => {
    if (!jwt) {
      //console.log("No token found");
      return;
    }

    try {
      const decodedToken = jwtDecode(jwt);
      setIsAdmin(decodedToken.role);
      //console.log("Se inició sesión", decodedToken.username);
    } catch (error) {
      //console.log("Error decoding JWT:", error);
    }
  };

  const changeJwt = (value) => {
    setJwt(value);
    localStorage.setItem("token", value);
  };

  const addToCart = (producto) => {
    setCarrito((prevCarrito) => {
      const existingProductIndex = prevCarrito.findIndex(item => item.codigo === producto.codigo);
      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCarrito];
        updatedCart[existingProductIndex].cantidad += 1;
        localStorage.setItem("carrito", JSON.stringify(updatedCart));
        toast.success(`${producto.nombre} añadido al carrito`);
        return updatedCart;
      } else {
        const newProduct = { ...producto, cantidad: 1 };
        const newCart = [...prevCarrito, newProduct];
        localStorage.setItem("carrito", JSON.stringify(newCart));
        toast.success(`${producto.nombre} añadido al carrito`);
        return newCart;
      }
    });
  };

  const clearCart = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  const incrementQuantity = (codigo) => {
    setCarrito((prevCarrito) => {
      const updatedCart = prevCarrito.map((item) => {
        if (item.codigo === codigo) {
          return { ...item, cantidad: item.cantidad + 1 };
        }
        return item;
      });
      localStorage.setItem("carrito", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const decrementQuantity = (codigo) => {
    setCarrito((prevCarrito) => {
      const updatedCart = prevCarrito.map((item) => {
        if (item.codigo === codigo && item.cantidad > 1) {
          return { ...item, cantidad: item.cantidad - 1 };
        }
        return item;
      });
      localStorage.setItem("carrito", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (codigo) => {
    setCarrito((prevCarrito) => {
      const updatedCart = prevCarrito.filter(item => item.codigo !== codigo);
      localStorage.setItem("carrito", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateCart = (updatedCart) => {
    setCarrito(updatedCart);
    localStorage.setItem("carrito", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    verifyEmployee();
  }, [jwt]);



  return (
    <BrowserRouter>
      <Navbar authenticated={!!jwt} role={role} changeJwt={changeJwt} />
      <Routes>
        <Route path="/" element={<Apps addToCart={addToCart} authenticated={!!jwt} />} />
        <Route path="/Home" element={<Apps addToCart={addToCart} authenticated={!!jwt} />} />
        <Route path="/Nosotros" element={ <Nosotros/>} />
        <Route path="/register" element={!!jwt ? <Navigate to="/Home" /> : <Register />} />
        <Route path="/registroSuccess" element={<RegistroSuccess />} />
        <Route path="/login" element={!!jwt ? <Navigate to="/Home" /> : <Login changeJwt={changeJwt}  />} />
        <Route path="/productos" element={!!jwt && role === 'admin' ? <AdminDashboard/> : <Navigate to="/login" />} />
        <Route path="/usuarios" element={!!jwt && role === 'admin' ? <AdminUsers /> : <Navigate to="/login" />} />
        <Route path="/productos/:codigo" element={<ProductDetails addToCart={addToCart} />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} clearCart={clearCart} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} removeFromCart={removeFromCart} updateCart={updateCart} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
