import React from 'react'
import '../styles/Error404.css'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';

const Error404 = () => {
  return (
    <div className='fondoerror404' style={{
        
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column"
    }}>
        <h1 className='textsize'>Pagina no encontrada</h1>
        <h2 className='textsize'>Error 404</h2>
        <Link to="/Home">
            <Button>Volver al inicio</Button>
        </Link>
        
    </div>
  )
}

export default Error404