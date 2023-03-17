const gallery=document.querySelector('.gallery')

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