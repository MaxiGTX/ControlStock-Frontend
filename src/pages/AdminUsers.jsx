import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import config from '../common/config';
import UserForm from '../components/UserForm';
import '../styles/AdminProduct.css'; 

const AdminUsers = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    try {
      const response = await axios.get(`${config.BASE_API}/userEdit/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsuarios(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${config.BASE_API}/users/${userToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchUsers();
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setShowModal(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="Adproductback">
      {/* Título */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">Administrador de Usuarios</h1>
      </div>

      {/* Tabla de Usuarios */}
      <div className="mx-auto" style={{ maxWidth: '90%' }}>
        <Table striped bordered hover responsive className="text-center">
          <thead className='table-dark'>
            <tr>
              <th className="thback">Username</th>
              <th className="thback">Email</th>
              <th className="thback">Nombre</th>
              <th className="thback">Apellido</th>
              <th className="thback">Teléfono</th>
              <th className="thback">Género</th>
              <th className="thback">Rol</th>
              <th className="thback">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario.username}</td>
                <td>{usuario.email}</td>
                <td>{usuario.firstname}</td>
                <td>{usuario.lastname}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.genero}</td>
                <td>{usuario.role}</td>
                <td>
                  {/* Contenedor Flex para Botones */}
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(usuario)}
                    >
                      <FaEdit /> Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => confirmDelete(usuario._id)}
                    >
                      <FaTrash /> Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
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

      {/* Formulario de Usuario */}
      {showForm && (
        <UserForm
          user={selectedUser}
          onClose={() => setShowForm(false)}
          onRefresh={fetchUsers}
        />
      )}
    </div>
  );
};

export default AdminUsers;
