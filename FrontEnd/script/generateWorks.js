export const generateWorks = (arrayWorks) => {
    const gallery=document.querySelector('.gallery')
    gallery.innerHTML=""
    for (let index = 0; index < arrayWorks.length; index++) {
      const figure= document.createElement('figure')
      const image =document.createElement('img')
      image.setAttribute("src",arrayWorks[index].imageUrl)
      figure.appendChild(image)
      const titre = document.createElement('figcaption')
      titre.innerText=arrayWorks[index].title
      figure.appendChild(titre)
      gallery.appendChild(figure)
    }
}

