import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../styles/ProductForm.css'
import config from '../common/config.js'

const ProductForm = ({ product, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    precio: '',
    stock: '',
    tipo: 'standard',
    imagen: '',
    categoria: 'Electronica',
    descripcion: '',
    fechaUltimoControl: ''
  });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        codigo: product.codigo ?? '',
        nombre: product.nombre ?? '',
        precio: product.precio ?? '',
        stock: product.stock ?? '',
        tipo: product.tipo ?? 'standard',
        imagen: product.imagen ?? '',
        categoria: product.categoria ?? 'Electronica',
        descripcion: product.descripcion ?? '',
        fechaUltimoControl: product.fechaUltimoControl ? new Date(product.fechaUltimoControl).toISOString().split('T')[0] : ''
      });
    }
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.BASE_API}/api/categories`);
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'categoria' && value === 'otros') {
      setShowNewCategoryInput(true);
    } else if (name === 'categoria') {
      setShowNewCategoryInput(false);
    }
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 

    try {
      let category = formData.categoria;
      if (showNewCategoryInput && newCategory) {
        const response = await axios.post(`${config.BASE_API}/api/categories`, { nombre: newCategory }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        category = response.data.data.nombre;
        setCategories([...categories, response.data.data]);
      }

      const data = {
        codigo: parseInt(formData.codigo),
        nombre: formData.nombre,
        precio: parseInt(formData.precio),
        stock: parseInt(formData.stock),
        tipo: formData.tipo,
        imagen: formData.imagen,
        categoria: category,
        descripcion: formData.descripcion,
        fechaUltimoControl: new Date(formData.fechaUltimoControl).toISOString() 
      };

      if (product) {
        await axios.put(`${config.BASE_API}/api/products/${product._id}`, data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        await axios.post(`${config.BASE_API}/api/products`, data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header className='modalback' closeButton>
        <Modal.Title>{product ? 'Editar Producto' : 'Crear Producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='modalback'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCodigo">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPrecio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="text"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="text"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formTipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              as="select"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
            >
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="special">Special</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formImagen">
            <Form.Label>Ingrese URL de Imagen</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>
          <Form.Group controlId="formFechaUltimoControl">
            <Form.Label>Fecha de Último Control de Stock</Form.Label>
            <Form.Control
              type="date"
              name="fechaUltimoControl"
              value={formData.fechaUltimoControl}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCategoria">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as="select"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat.nombre}>{cat.nombre}</option>
              ))}
              <option>Seleccionar una categoria</option>
              <option value="otros">Otros</option>
            </Form.Control>
            {showNewCategoryInput && (
              <Form.Control
                type="text"
                placeholder="Ingrese nueva categoría"
                value={newCategory}
                onChange={handleNewCategoryChange}
                className="mt-2"
              />
            )}
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            {product ? 'Guardar Cambios' : 'Crear Producto'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;
