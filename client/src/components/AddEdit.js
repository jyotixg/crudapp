import React, { useState, useEffect } from 'react'
import './AddEdit.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, Toast } from 'react-toastify';

const initialState = {
    product: "",
    price: "",
    description: "",
    category: "",
}


const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const { product, price, description, category } = state;
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
            .then((resp) => setState({ ...resp.data[0] }));
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!product || !price || !description || !category) {
            toast.error("Please provide value into each input field!")
        }
        else {
            if (!id) {
                axios.post("http://localhost:5000/api/post", {
                    product,
                    price,
                    description,
                    category
                })
                    .then(() => {
                        setState({ product: "", price: "", description: "", category: "" });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Product Added Successfully");
            } else {
                axios.put(`http://localhost:5000/api/update/${id}`, {
                    product,
                    price,
                    description,
                    category
                })
                    .then(() => {
                        setState({ product: "", price: "", description: "", category: "" });
                    })
                    .catch((err) => toast.error(err.response.data));
                toast.success("Product Updated Successfully");
            }
            setTimeout(() => navigate('/'), 500)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    return (
        <div style={{ marginTop: "100px" }} >
            <form onSubmit={handleSubmit} style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }} >
                <label htmlFor="product" >Product</label>
                <input type="text" id="product" name='product' placeholder='Enter product...' value={product || ""} onChange={handleInputChange} />
                <label htmlFor="price" >Price</label>
                <input type="text" id="price" name='price' placeholder='Enter price...' value={price || ""} onChange={handleInputChange} />
                <label htmlFor="description" >Description</label>
                <input type="text" id="description" name='description' placeholder='Enter description...' value={description || ""} onChange={handleInputChange} />
                <label htmlFor="category" >Category</label>
                <input type="text" id="category" name='category' placeholder='Enter category...' value={category || ""} onChange={handleInputChange} />
                <input type="submit" value={id ? "update" : "save"} />
                <Link to="/" >
                    <input type="button" value="Go Back" />
                </Link>
            </form>
        </div>
    )
}

export default AddEdit