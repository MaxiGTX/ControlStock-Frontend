import React from 'react';
import '../styles/RegistroSuccess.css'

const RegistroSuccess = () => {
  return (
  <div className="successback">
    <div className="container my-4 justify-content-center">
      <div className="row justify-content-center text-center">
        <div className="col col-sm-12 col-md-10 col-lg-7 col-xl-8">
          <i className="fa-regular fa-circle-check"></i>
          <p className="mt-3 fs-4">Tu perfil fue creado exitosamente</p>
          <p className="fs-5">Estamos validando tus datos, pronto podrás verificar productos.</p>
          <a href="/login">
            <button type="button" className="btn_inicio mt-3">Volver al inicio</button>
          </a>
        </div>
      </div>
    </div>
  </div>
  );
};

export default RegistroSuccess;
