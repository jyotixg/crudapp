const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "jyoti@5526#gupta",
    database: "crud_product"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM product_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    })
})

app.post("/api/post", (req, res) => {
    const { product, price, description, category } = req.body;
    const sqlInsert = "INSERT INTO product_db (product, price, description, category) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [product, price, description, category], (error, result) => {
        if (error) {
            console.log(error)
        }
    })
})

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM product_db WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    })
})

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM product_db WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    })
})

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { product, price, description, category } = req.body;
    const sqlUpdate = "UPDATE product_db SET product = ?, price = ?, description = ?, category = ? WHERE id = ?"
    db.query(sqlUpdate, [product, price, description, category, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    })
})

app.listen(5000, () => {
    console.log("Server running on port 5000")
})