import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { ListGroup, Button, Modal, Image } from 'react-bootstrap';
import { FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import config from '../common/config';
import axios from 'axios';
import '../styles/Carrito.css'

function Carrito({ carrito, clearCart, incrementQuantity, decrementQuantity, removeFromCart, updateCart }) {
  const [showModal, setShowModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);



  useEffect(() => {
    const actualizarPrecios = async () => {
      const updatedCart = await Promise.all(carrito.map(async (producto) => {
        try {
          const response = await axios.get(`${config.BASE_API}/api/products/codigo/${producto.codigo}`);
          return { ...producto, precio: response.data.data.precio };
        } catch (error) {
          console.error('Error actualizando precio del producto:', error);
          return producto;
        }
      }));
      updateCart(updatedCart);
    };

    actualizarPrecios();
  }, []);

  const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

  const confirmDelete = (codigo) => {
    setProductToDelete(codigo);
    setShowModal(true);
  };

  const handleDelete = () => {
    removeFromCart(productToDelete);
    setShowModal(false);
  };

  const confirmClearCart = () => {
    setShowClearModal(true);
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearModal(false);
  };

  return (
    <div className='backcarrito d-flex justify-content-center'>
    <div className='col-md-7 col-12 mb-3'>
      <h2>Carrito de Compras</h2>
      <ListGroup>
        {carrito.map((producto, index) => (
          <ListGroup.Item key={index} className="mb-3 text-white backlista d-flex flex-column flex-md-row">
            <div className="d-flex align-items-center">
              <Image src={producto.imagen} rounded style={{ width: '50px', height: '50px', marginRight: '10px' }} />
              <div>
                {producto.nombre} - $ {producto.precio.toLocaleString('es-AR', { minimumFractionDigits: 0 })} x {producto.cantidad}
              </div>
            </div>
            <div>
              <Button className='m-2' variant="outline-light" size="sm" onClick={() => decrementQuantity(producto.codigo)}>-</Button>
              <Button className='m-2' variant="outline-light" size="sm" onClick={() => incrementQuantity(producto.codigo)}>+</Button>
              <Button className='m-2' variant="outline-danger" size="sm" onClick={() => confirmDelete(producto.codigo)}><FaTrash />Eliminar</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h3>Total: $ {total.toLocaleString('es-AR', { minimumFractionDigits: 0 })}</h3>
      <Link to="/NotFound">
      <Button variant="primary" className="me-2">Proceder al Pago</Button>
      </Link>
      <Button variant="danger" onClick={confirmClearCart}><FaTrash className='' />Limpiar Carrito</Button>

      {/* Modal de Confirmación para Eliminar Producto */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="modal-body-delete">
          <div className="row">
            <div className="col-12 text-center">
              <FaExclamationTriangle size={50} className="text-warning" />
            </div>
            <div className="col-12 text-center mt-3">
              <p className="advertencia">¿Estás seguro?</p>
              <p className="advertencia-contenido">
                Este proceso es irreversible, si continúas los elementos ya no se podrán recuperar.
              </p>
            </div>
          </div>
          <div className="row justify-content-between text-center mt-5">
            <div className="col-6">
              <Button variant="secondary" className="w-100" onClick={() => setShowModal(false)}>
                Cerrar
              </Button>
            </div>
            <div className="col-6">
              <Button variant="danger" className="w-100" onClick={handleDelete}>
                Eliminar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal de Confirmación para Limpiar Carrito */}
      <Modal show={showClearModal} onHide={() => setShowClearModal(false)} centered>
        <Modal.Body className="modal-body-delete">
          <div className="row">
            <div className="col-12 text-center">
              <FaExclamationTriangle size={50} className="text-warning" />
            </div>
            <div className="col-12 text-center mt-3">
              <p className="advertencia">¿Estás seguro?</p>
              <p className="advertencia-contenido">
                Este proceso es irreversible, si continúas todos los elementos del carrito se eliminarán.
              </p>
            </div>
          </div>
          <div className="row justify-content-between text-center mt-5">
            <div className="col-6">
              <Button variant="secondary" className="w-100" onClick={() => setShowClearModal(false)}>
                Cerrar
              </Button>
            </div>
            <div className="col-6">
              <Button variant="danger" className="w-100" onClick={handleClearCart}>
                Limpiar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    </div> 
  );
}

export default Carrito;
