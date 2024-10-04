import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import ProductForm from '../components/ProductForm';
import config from '../common/config';
import '../styles/AdminProduct.css'; 

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.BASE_API}/api/products`);
      setProductos(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token'); 
    try {
      await axios.delete(`${config.BASE_API}/api/products/${productToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const confirmDelete = (id) => {
    setProductToDelete(id);
    setShowModal(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderProductRow = (producto) => (
    <tr key={producto._id}>
      <td>{producto.codigo}</td>
      <td>{producto.nombre}</td>
      <td>${producto.precio.toLocaleString('es-AR', { minimumFractionDigits: 0 })}</td><td>{producto.stock.toLocaleString('es-AR', { minimumFractionDigits: 0 })}</td>
      <td>{producto.categoria}</td>
      <td>{producto.fechaUltimoControl ? new Date(new Date(producto.fechaUltimoControl).getTime() + new Date(producto.fechaUltimoControl).getTimezoneOffset() * 60000).toLocaleDateString('es-AR') : 'N/A'}</td>
      <td>
        <div className="d-flex justify-content-center gap-2">
          <Button variant="warning" onClick={() => handleEdit(producto)}>
            <FaEdit /> Editar
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(producto._id)}>
            <FaTrash /> Eliminar
          </Button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="Adproductback">
      {/* Título */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">Administrador de Productos</h1>
      </div>

      {/* Botón "Crear Producto" */}
      <div className="text-center mb-4">
        <Button variant="primary" onClick={handleCreate}>
          Crear Producto
        </Button>
      </div>

      {/* Formulario de Producto */}
      {showForm && (
        <div className="mx-auto mb-4" style={{ maxWidth: '800px' }}>
          <ProductForm
            product={selectedProduct}
            onClose={() => setShowForm(false)}
            onRefresh={fetchProducts}
          />
        </div>
      )}

      {/* Tabla de Productos */}
      <div className="mx-auto" style={{ maxWidth: '90%' }}>
        <Table striped bordered hover responsive className="text-center">
          <thead className='table-dark'>
            <tr>
              <th className="thback">Código</th><th className="thback">Nombre</th><th className="thback">Precio</th><th className="thback">Stock</th><th className="thback">Categoría</th><th className="thback">Último Control</th><th className="thback">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(renderProductRow)}
          </tbody>
        </Table>
      </div>

      {/* Modal de Confirmación */}
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
    </div>
  );
};

export default AdminDashboard;
