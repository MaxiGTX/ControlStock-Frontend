import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../styles/ProductForm.css'; 
import config from '../common/config.js'

const UserForm = ({ user, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    role: 'user'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        role: user.role
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const data = {
        role: formData.role
      };

      await axios.put(`${config.BASE_API}/api/userEdit/users/${user._id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header className='modalback' closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body className='modalback'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formRole">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="premium">Premium</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserForm;
