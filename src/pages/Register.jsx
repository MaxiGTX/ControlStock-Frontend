import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';
import config from '../common/config.js'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    lastname: '',
    firstname: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    genero: '',
    terminos: false,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    username: /^[a-zA-ZÀ-ÿ\s]{8,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 dígitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 números.
  };

  const mensajesError = {
    username: 'Escribe tu nombre de usuario debe tener minimo 8 caracteres',
    email: 'Ingrese un correo valido',
    lastname: 'Escribe tu apellido',
    firstname: 'Escribe tu nombre',
    telefono: 'Telefono invalido',
    password: 'La contraseña debé tener entre 4 y 12 digitos',
    confirmPassword: 'Las contraseñas no coinciden',
    genero: 'Seleccione un genero.',
    terminos: 'Debes aceptar los terminos y condiciones.',
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (touched[name]) {
      validarCampo(expresiones[name] || /.*/, value, name);
    }
    if (name === 'email') {
      validarCampo(expresiones.correo, value, name);
    } else if (touched[name]) {
      validarCampo(expresiones[name] || /.*/, value, name);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    if (name === 'email') {
      if (value.includes('@') && value.includes('.')) {
        validarCampo(expresiones.correo, value, name);
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: mensajesError[name] }));
      }
    } else {
      validarCampo(expresiones[name] || /.*/, value, name);
    }
  };

  const validarCampo = (expresion, valor, campo) => {
    if (valor === '') {
      setErrors((prevErrors) => ({ ...prevErrors, [campo]: mensajesError[campo] }));
      return false;
    } else if (expresion.test(valor)) {
      setErrors((prevErrors) => ({ ...prevErrors, [campo]: '' }));
      return true;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [campo]: mensajesError[campo] }));
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTouched = {};
    Object.keys(formData).forEach((key) => {
      newTouched[key] = true;
    });
    setTouched(newTouched);

    const validUsername = validarCampo(expresiones.username, formData.username, 'username');
    const validEmail = validarCampo(expresiones.correo, formData.email, 'email');
    const validApellido = validarCampo(expresiones.nombre, formData.lastname, 'lastname');
    const validNombre = validarCampo(expresiones.nombre, formData.firstname, 'firstname');
    const validTelefono = validarCampo(expresiones.telefono, formData.telefono, 'telefono');
    const validPassword = validarCampo(expresiones.password, formData.password, 'password');
    const validConfirmPassword = formData.password === formData.confirmPassword;
    const validGenero = formData.genero !== '';
    const validTerminos = formData.terminos;

    if (validUsername && validEmail && validApellido && validNombre && validTelefono && validPassword && validConfirmPassword && validGenero && validTerminos) {
      try {
        const response = await axios.post(`${config.BASE_API}/api/users/register`, formData);
        setMessage(response.data.message);
        navigate('/registroSuccess');
      } catch (error) {
        setMessage('Error al registrar el usuario');
        console.error(error.response.data);
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: !validConfirmPassword ? mensajesError.confirmPassword : '',
        genero: !validGenero ? mensajesError.genero : '',
        terminos: !validTerminos ? mensajesError.terminos : '',
      }));
      setMessage('Por favor, completa todos los campos correctamente.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
  <div className="registerback">
    <div className="container my-3 rounded justify-content-center">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h1 className="fw-bold fst-italic text-center py-3">Crea tu cuenta</h1>
          <p className="fs-6">Continua con el registro para disfrutar de tus productos favoritos.</p>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-10 col-xl-8 justify-content-center my-2">
          <form onSubmit={handleSubmit} className="formularioRegistro rounded" noValidate>
            <Field
              name="username"
              label="Nombre de Usuario"
              type="text"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.username}
              error={errors.username}
            />
            <Field
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.email}
              error={errors.email}
            />
            <Field
              name="lastname"
              label="Apellido"
              type="text"
              value={formData.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.lastname}
              error={errors.lastname}
            />
            <Field
              name="firstname"
              label="Nombre"
              type="text"
              value={formData.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.firstname}
              error={errors.firstname}
            />
            <Field
              name="telefono"
              label="Teléfono"
              type="text"
              value={formData.telefono}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.telefono}
              error={errors.telefono}
            />
            <Field
              name="password"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.password}
              error={errors.password}
              toggleShowPassword={toggleShowPassword}
              showPassword={showPassword}
            />
            <Field
              name="confirmPassword"
              label="Repetir Contraseña"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.confirmPassword}
              error={errors.confirmPassword}
              toggleShowPassword={toggleShowPassword}
              showPassword={showPassword}
            />
            <div className={`form_grupo mb-3 ${touched.genero && errors.genero ? 'invalid' : ''}`} id="form-group-genero">
              <label htmlFor="genero_formRegistro" className="form-label">Género</label>
              <select
                className={`form-select ${touched.genero && (errors.genero ? 'is-invalid' : 'is-valid')}`}
                id="genero_formRegistro"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              >
                <option value="" disabled>Seleccione</option>
                <option value="female">Femenino</option>
                <option value="male">Masculino</option>
                <option value="other">Otro</option>
              </select>
              {touched.genero && errors.genero && <div className="input-error"><p>{errors.genero}</p></div>}
            </div>
            <div className={`form_grupo mb-3 ${touched.terminos && errors.terminos ? 'invalid' : ''}`} id="form-group-terminos">
              <div className="form-check">
                <input
                  type="checkbox"
                  className={`form-check-input ${touched.terminos && (errors.terminos ? 'is-invalid' : 'is-valid')}`}
                  id="check-terminos"
                  name="terminos"
                  checked={formData.terminos}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <label className="form-check-label" htmlFor="check-terminos">Acepto los Términos y Condiciones</label>
                {touched.terminos && errors.terminos && <div className="input-error-checked"><p>{errors.terminos}</p></div>}
              </div>
            </div>
            <button type="submit" className="btn_submit">Registrar</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  </div>
  );
};

const Field = ({ name, label, type, value, onChange, onBlur, touched, error, toggleShowPassword, showPassword }) => (
  <div className="form_grupo mb-3" id={`form-group-${name}`}>
    <label htmlFor={`${name}_formRegistro`} className="form-label">
      {label}
    </label>
    <div className="form_grupo_input">
      <input
        type={type}
        className={`form-control ${touched && (error ? 'is-invalid' : 'is-valid')}`}
        id={`${name}_formRegistro`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
      {name === 'password' || name === 'confirmPassword' ? (
        <span onClick={toggleShowPassword} className="password-toggle-icon">
          {showPassword ? '🙈' : '👁️'}
        </span>
      ) : null}
      <i className={`icon-validacion ${touched && (error ? 'icon-error' : 'icon-success')}`}></i>
    </div>
    {touched && error && <p className="error-message">{error}</p>}
  </div>
);

export default Register;
