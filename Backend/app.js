const gallery=document.querySelector('.gallery')

/*
image.innerText="image";
figure.appendChild(image)
const figcaption=document.createElement("figcaption");
figcaption.innerText='texte';
figure.appendChild(figcaption);*/


const createFigure = (e)=>{
  const figure=  document.createElement("figure");
  e.appendChild(figure);
}

const createImage= (arrayElement)=>{
  const image= document.createElement("image");
  image.setAttribute=arrayElement.imageUrl;
}




const createAllWorks = (array, id) =>{
  for (let index = 0; index < array.length; index++) {
    const figure = createFigure(id);
    createImage(figure,array[index]);
  }
}




const projects= async()=>{
  let data = await fetch('http://localhost:5678/api/works');
  console.log("data : "+data);
  let response = await data.json();
  for (let index = 0; index < response.length; index++) {
      console.log("Titre du projet : "+response[index].title)
      createFigure(gallery);
      const child =gallery.children[index];
      const image = document.createElement('img')
      image.setAttribute("src",response[index].imageUrl);
      child.appendChild(image);
      const title= document.createElement('figcaption');
      title.innerText=response[index].title;
      child.appendChild(title);
    }
}

projects();







const express = require('express');
const path = require('path');
const cors = require('cors')
require('dotenv').config();
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocs = yaml.load('swagger.yaml')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet({
      crossOriginResourcePolicy: false,
    }));
app.use('/images', express.static(path.join(__dirname, 'images')))

const db = require("./models");
const userRoutes = require('./routes/user.routes');
const categoriesRoutes = require('./routes/categories.routes');
const worksRoutes = require('./routes/works.routes');
const { create } = require('domain');
db.sequelize.sync().then(()=> console.log('db is ready'));
app.use('/api/users', userRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/works', worksRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
module.exports = app;





