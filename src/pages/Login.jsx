// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import config from '../common/config.js'

const Login = ({ changeJwt }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.BASE_API}/api/users/login`, formData);
      const token = response.data.access_token;
      console.log("Token received:", token);
      changeJwt(token);
      window.location.href = '/Home';
    } catch (error) {
      setError('La dirección o contraseña que escribiste no es correcta. Prueba otra vez o haz clic en el enlace "Olvidaste tu contraseña".');
    }
  };

  return (
    <div className="loginback">
      <div className="container my-5 justify-content-center">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-4 w-75">
            <div className="body" id="card-body">
              <h2 className="text-center mb-2">Inicia sesión</h2>
              <form onSubmit={handleSubmit} id="formLogin">
                <p className="text-center mb-4">Ingrese su nombre de usuario y contraseña para poder ingresar.</p>
                <div className="my-3">
                  <label htmlFor="username" className="form-label">Dirección de correo electrónico</label>
                  <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input className="form-control" type="password" id="password" name="password" value={formData.password} onChange={handleChange} required minLength="4" maxLength="40" />
                </div>
                {error && <p className="alert alert-danger text-center login-incorrecto" id="parrafo-alert">{error}</p>}
                <div className="mb-3">
                  <a href="/html/login/resetPassword.html" className="link-restablecer-password">¿Olvidé mi contraseña?</a>
                </div>
                <div className="mt-3">
                  <button type="submit" className="btn_submit" id="btn-submit">Iniciar sesión</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
