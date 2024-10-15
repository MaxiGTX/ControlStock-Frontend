import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Producto.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Producto({ producto, addToCart, authenticated }) {  
  const handleAddToCart = () => {      
    toast.error("Debes iniciar sesión para añadir productos al carrito");      
    return;  
  };

  return (    
    <Card className="card-personalizada m-3">      
      <Card.Img 
        variant="top" 
        src={producto.imagen} 
        alt={producto.nombre || "Imagen no disponible"} 
        className="card-personalizada-img" 
      />      
      <Card.Body>        
        <Card.Title>{producto.nombre} ($ {producto.precio.toLocaleString('es-AR', { minimumFractionDigits: 0 })})</Card.Title>        
        <Card.Text>{producto.stock.toLocaleString('es-AR', { minimumFractionDigits: 0 })} en stock</Card.Text>        
        <Link to={authenticated ? `/productos/${producto.codigo}` : "/login"}>          
          <Button variant="outline-info" className="mt-2 text-black">Ver detalles</Button>        
        </Link>        
        <Button 
          variant="primary" 
          className="mt-2" 
          onClick={() =>{authenticated ? addToCart(producto) : handleAddToCart()} }
        >
          Agregar al carrito
        </Button>      
      </Card.Body>    
    </Card>  
  );
}

export default Producto;
