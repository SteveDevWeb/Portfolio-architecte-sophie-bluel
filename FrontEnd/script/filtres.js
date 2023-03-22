import { generateWorks } from "./generateWorks.js";

//Requete Filtres
const filtreWorksRequete = async (nbCaterogy) => {
    const requeteWorks = await fetch('http://localhost:5678/api/works');
    const reponseWorks = await requeteWorks.json()
    const objectsArray = reponseWorks.filter(work => work.category.id == nbCaterogy)
    generateWorks(objectsArray)
  }

//Requete pour tous les travaux
const allWorks = async () => {
    const requeteWorks = await fetch('http://localhost:5678/api/works');
    const reponseWorks = await requeteWorks.json()
    generateWorks(reponseWorks)
  }

//Bouton "Tous"
const tousBtn = document.querySelector('#tous')
tousBtn.addEventListener("click", () => {
    allWorks()
})




//Filtre Objets
const objetsBtn = document.querySelector('#objets')
objetsBtn.addEventListener("click", () => {
    filtreWorksRequete(1)
})

//Filtre Appartement
const appartBtn = document.querySelector('#appart')
appartBtn.addEventListener("click", () => {
    filtreWorksRequete(2)
})

//Filtre Hotels & Restaurants
const hotelRestauBtn = document.querySelector('#hotelRestau')
hotelRestauBtn.addEventListener("click", () => {
    filtreWorksRequete(3)
})



export {filtreWorksRequete, allWorks, tousBtn ,objetsBtn,appartBtn,hotelRestauBtn}