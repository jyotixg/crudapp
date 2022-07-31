import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Home.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  }

  useEffect(() => {
    loadData();
  }, [])

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Product Deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  }


  return (
    <div style={{ marginTop: "100px" }} >
      <h2 style={{marginBottom:"", marginLeft:"-700px"}} >Products</h2>
      <Link to='/addProduct' >
        <button className="btn-contact" >Create Product</button>
      </Link>
      <table className='styled-table' border={1} >
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr key={item.id} >
                  <td>{item.product}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>
                  <Link to={`/view/${item.id}`} >
                      <button className='btn btn-view' ><i class="fa fa-eye" aria-hidden="true"></i> Read</button>
                    </Link>
                    <Link to={`/update/${item.id}`} >
                      <button className='btn btn-edit' ><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                    </Link>
                    <button className='btn btn-delete' onClick={() => deleteProduct(item.id)} ><i class="fa fa-times" aria-hidden="true"></i> Delete</button>
                   
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home