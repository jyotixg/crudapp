import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './View.css';

const View = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
            .then((resp) => setProduct({ ...resp.data[0] }));
    }, [id])

    return (
        <div style={{ marginTop: "150px" }} >
            <div className='card' >
                <div className='card-header' >
                    <p>Product Details</p>
                </div>
                <div className='container' >
                    <strong>Product: </strong>
                    <span>{product.product}</span>
                    <br />
                    <br />
                    <strong>Price: </strong>
                    <span>{product.price}</span>
                    <br />
                    <br />
                    <strong>Description: </strong>
                    <span>{product.description}</span>
                    <br />
                    <br />
                    <strong>Category: </strong>
                    <span>{product.category}</span>
                    <br />
                    <br />
                    <Link to='/' >
                        <div className='btn btn-edit' >Go Back</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View