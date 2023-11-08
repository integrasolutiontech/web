const express = require('express')
const app = express()
const port = 3000
const mysql = require("mysql2")
var cors = require("cors")
const query = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",


    database: "shopping"
})
app.use(cors())
app.use(express.json())
app.post('/products', (req, res) => {
    const { name, price, descrption } = req.body
    query.execute(`insert into products(name,price,descrption) 
values('${name}','${price}','${descrption}')`)
    res.json({ message: "product added sucssefully" })
})
app.get('/products', (req, res) => {
    query.execute("select * from products", (err, data) => {
        if (err) {
            res.json({ message: `error/n `, err })
        }
        res.json({ message: `success`, data })
    })
})
app.get('/products/:id', (req, res) => {
    const { id } = req.params
    query.execute(`select * from products where id='${id}'`, (err, data) => {
        if (err) {
            res.json({ message: 'error', err })
        } else {
            res.json({ message: `success`, data })
        }
    })
})
app.delete('/products', (req, res) => {
    const { id } = req.body
    query.execute(`delete from products where id=${id} `)
    res.json({ message: "product deleted sucssefully" })
})
app.put('/products', (req, res) => {
    const { id, name, price, descrption } = req.body


    query.execute(`update products set name='${name}' , price='${price}', 
descrption='${descrption}' where id=${id} `)
    res.json({ message: "product updated sucssefully" })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
