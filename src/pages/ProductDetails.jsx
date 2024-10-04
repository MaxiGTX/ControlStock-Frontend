// ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import "../styles/ProductDetails.css";
import config from '../common/config.js'

const ProductDetails = ({ addToCart }) => {
    const { codigo } = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await axios.get(`${config.BASE_API}/products/codigo/${codigo}`);
                setProducto(response.data.data);
            } catch (error) {
                setError('Producto no encontrado');
                console.error('Error fetching product:', error);
            }
        };
        fetchProducto();
    }, [codigo]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!producto) {
        return <p>Cargando...</p>;
    }

    return (
        <>
        <div className='backdetail'>
        <Container className="product-details-container">
            <Row className="mt-5">
                <Col className='col-md-6 col-12 mb-3'>
                    <Image src={producto.imagen} className="card-personalizada-img" fluid />
                </Col>
                <Col md={6}>
                    <h1>{producto.nombre}</h1>
                    <p><strong>Precio:</strong> ${producto.precio.toLocaleString('es-AR', { minimumFractionDigits: 0 })}</p>
                    <p><strong>Stock:</strong> {producto.stock} kg</p>
                    <p><strong>Descripción:</strong> {producto.descripcion}</p>
                    <Button variant="primary" className="mt-2" onClick={() => addToCart(producto)}>Agregar al carrito</Button>
                </Col>
            </Row>
        </Container>
        </div>
    </>
    );
};

export default ProductDetails;
