const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const books = require('./books.js');
const route = express.Router();
const book = require("./controller.js");

//Database Connection
const db = require('./dbconfig.js');
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));

app.post('/api/create', (req,res)=>{
    book.create(req,res);
});

app.get('/api/Read', (req,res)=>{
    book.findAll(req,res);
});

app.get('/api/ReadOne', (req,res)=>{
    book.findOne(req,res);
});

app.put('/api/update', (req,res)=>{
    book.update(req,res);
});

app.delete('/api/delete', (req,res)=>{
    book.delete(req,res);
});

const PORT = process.env.PORT || 3000;
db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));


