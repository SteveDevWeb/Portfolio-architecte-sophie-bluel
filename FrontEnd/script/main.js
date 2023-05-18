import { generateWorks } from "./generateWorks.js";
import { filtreWorksRequete, allWorks, tousBtn ,objetsBtn,appartBtn,hotelRestauBtn} from "./filtres.js";
import { isAuth } from "./authentification.js";
allWorks()
isAuth()


if (isAuth()) {
    const closeButton1 = document.querySelector('.close-button1')
    const closeButton2 = document.querySelector('.close-button2')
    const modal = document.querySelector('#modal')
    const modalDelete=document.querySelector('.wrapper-modal-delete')
    const modalAdd=document.querySelector('.wrapper-modal-add')
    const modifyButton =document.querySelector('.btn-modify')
    const addPicButton=document.querySelector('.add-work')
    const backDeleteButton=document.querySelector('.back-delete')


    //close button modal
    closeButton1.addEventListener("click", () => modal.style.display = "none") 
    closeButton2.addEventListener("click", () => modal.style.display = "none")     
    //open modal
    modifyButton.addEventListener("click",() => modal.style.display="flex")   
    //add picture button
    addPicButton.addEventListener("click", () => {
        modalDelete.style.display="none";
        modalAdd.style.display="flex"
    })
    //back delete butto,
    backDeleteButton.addEventListener("click", () => {
        modalAdd.style.display="none";
        modalDelete.style.display="flex"
    })




    // Fonction de suppression des travaux
            
    const removeWork = async (id) => {

        const localStorageValue = sessionStorage.getItem('data'); // Récupération de la valeur stockée avec la clé 'data'
        const parsedObject = JSON.parse(localStorageValue); // Conversion de la chaîne de caractères en objet JavaScript
        const token = parsedObject.token; // Récupération de la valeur de la propriété 'token'

        await fetch(`http://localhost:5678/api/works/${parseInt(id)}`, {
            method: 'DELETE',
            headers: {
                "accept": "*/*",
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(() => {
            allWorks()
            worksModal()
        })
    }


    // Fonction d'ajout de travaux (works)
       
    const uploadInput = document.getElementById('image');
    const uploadedImage = document.getElementById('uploaded-image');

    uploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
    
        if (file) {
            const imageURL = URL.createObjectURL(file);
            uploadedImage.src = imageURL;
            uploadedImage.style.display="block"
        }
    })

   const submitFormButton = document.querySelector('#submit-work')
   submitFormButton.addEventListener("click", (e) => {
        e.preventDefault();
        const image = document.querySelector('#image').files[0]
        const title = document.querySelector('#title').value
        const category = parseInt(document.querySelector('.category-selector').value)
        console.log('image : '+image)
        console.log('titre : '+title)
        console.log('category ID : '+category)
        if (image==undefined || title=="" || category=="") {
            document.querySelector('.form-errors').innerText = "Veuillez remplir tous les champs";
            return //ne poursuit pas le code 
        }
        console.log('form valide')

        const data = {
            image: image,
            title: title,
            category: category
        }
        const localStorageValue = sessionStorage.getItem('data'); // Récupération de la valeur stockée avec la clé 'data'
        const parsedObject = JSON.parse(localStorageValue); // Conversion de la chaîne de caractères en objet JavaScript
        const token = parsedObject.token; // Récupération de la valeur de la propriété 'token'

        const formData = new FormData()
        formData.append('image', data.image)
        formData.append('title', data.title)
        formData.append('category', data.category)

        fetch("http://localhost:5678/api/works", {
            method: 'POST',
            headers: {
                "accept": "*/*",
                "Authorization": `Bearer ${token}`  },
            body: formData
        })
        .then(response => response.json())
        .then((data) => {
            console.log("data : "+data)
        })
    } )









    const generateWorksModal = (arrayWorks) => {
        const galleryModal=document.querySelector('#gallery-works')
        galleryModal.innerHTML=""
        for (let index = 0; index < arrayWorks.length; index++) {
            const div =document.createElement('div')
            div.classList.add('work')
            const image =document.createElement('img')
            image.classList.add('pic-work')
            image.setAttribute("src",arrayWorks[index].imageUrl)
            div.appendChild(image)
            const corbeille=document.createElement('img')
            corbeille.classList.add('corbeille')
            corbeille.setAttribute("src", "../FrontEnd/assets/images/corbeille.png")

            corbeille.addEventListener("click",(e) => {
                e.preventDefault()
                console.log("work "+arrayWorks[index].id+" has been deleted");
                removeWork(arrayWorks[index].id)
            })

            galleryModal.appendChild(div)
            div.appendChild(corbeille)
        }
    }

    const worksModal = async () => {
        const requeteWorks = await fetch('http://localhost:5678/api/works');
        const reponseWorks = await requeteWorks.json()
        generateWorksModal(reponseWorks)
    }
    worksModal()

  


    

      

}




