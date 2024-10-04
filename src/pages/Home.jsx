import axios from 'axios';
import { useState, useEffect } from 'react';
import { Spinner, Container, Row, Col, Button, Form } from 'react-bootstrap';
import config from '../common/config';
import Producto from '../components/Producto';
import stockimagen from '../assets/stockimage.jpg';
import '../styles/Home.css';

function Apps({ addToCart, authenticated }) {
    const [recargar, setRecargar] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [productos, setProductos] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [categorias, setCategorias] = useState([]);

    const recuperarProductos = async () => {
        setCargando(true);
        const response = await axios.get(`${config.BASE_API}/api/products`);
        setProductos(response.data.data);
        setCargando(false);
    };

    const recuperarCategorias = async () => {
        const response = await axios.get(`${config.BASE_API}/api/categories`);
        setCategorias(response.data.data);
    };

    useEffect(() => {
        recuperarProductos();
        recuperarCategorias();
    }, [recargar]);

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleCategoriaChange = (e) => {
        setCategoriaSeleccionada(e.target.value);
    };

    const productosFiltrados = productos.filter(producto => 
        (producto.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
        producto.categoria.toLowerCase().includes(filtro.toLowerCase())) &&
        (categoriaSeleccionada === '' || producto.categoria === categoriaSeleccionada)
    );

    return (
        <>
        <div className='homeback'>
            {cargando && (
                <div>
                    <Button className="spinner" variant="primary">
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                         Cargando...
                    </Button>
                </div>
            )}

            <header>
                <Container fluid>
                    <Row>
                        <h1 className='text-primary text-center mt-3'>ControlStock</h1>
                    </Row>
                </Container>
            </header>

            <main className='homeback'>
                <Container fluid>

                <div className='d-flex'>
                    <div>
                    <h1 className='text-white'>Bienvenido a ControlStock</h1>
                    <p className='text-white'>
                      Esta es una aplicación de control de stock diseñada para ayudarte a gestionar tus productos de manera eficiente. 
                      Aquí puedes buscar productos por categoría, añadir nuevos productos y mantener tu inventario actualizado.
                    </p>
                      <div className='text-center mb-5'>
                        <img src={stockimagen} alt="stockimagen" className="neon-border img-fluid" width="300" height="250"  />
                      </div>
                    </div>
                </div>

                    <div className="mt-3 d-flex justify-content-center">
                        <div className='col-md-6 col-12 mx-5'>
                            <Form.Control 
                                type="text" 
                                placeholder="Buscar por nombre o categoría" 
                                value={filtro} 
                                onChange={handleFiltroChange} 
                            />
                        </div>
                        <div className='col-md-3 col-12'>
                            <Form.Select value={categoriaSeleccionada} onChange={handleCategoriaChange}>
                                <option value="">Todas las categorías</option>
                                {categorias.map(categoria => (
                                    <option key={categoria._id} value={categoria.nombre}>{categoria.nombre}</option>
                                ))}
                            </Form.Select>
                        </div>
                    </div>

                    <Row className="mt-3 text-center">
                        <Col>
                            <Button variant="primary" onClick={() => setRecargar(!recargar)}>Recargar</Button>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <h1 className='text-white'>Productos disponibles</h1>
                        {productosFiltrados.length > 0 ? (
                            productosFiltrados.map((item) => (
                                <Col lg={3} md={4} sm={6} xs={12} key={item.codigo} style={{ marginBottom: '1em' }}>
                                    <Producto producto={item} addToCart={addToCart} authenticated={authenticated} />
                                </Col>
                            ))
                        ) : (
                            <Col className='Adproductback'>
                                <h1 className='text-center'>No hay productos disponibles.</h1>
                            </Col>
                        )}
                    </Row>
                </Container>
            </main>
        </div>  
        </>
    );
}

export default Apps;
