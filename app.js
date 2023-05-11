const express = require('express');
const app = express();
require('dotenv').config();
const userroute=require('./Router/user')
const bookRoute=require('./Router/book')
const path = require('path');
const mongoose = require('mongoose')
app.use(express.json())
mongoose.connect(process.env.stringConnection ,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type','multipart/form-data');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  get('/', ()=>{
    return "hello"
  })
  app.use('/api/auth',userroute);
  app.use('/api/books',bookRoute);
  app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;
// MC MC19