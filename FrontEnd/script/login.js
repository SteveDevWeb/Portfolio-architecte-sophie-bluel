 const submit = document.querySelector("#submit");
 const errorMessage = document.querySelector("#errorMessage");
 submit.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    console.log("email: ", email);
    console.log("password: ", password);
    if (email=="" || password=="") {
        errorMessage.innerText = "Veuillez remplir tous les champs";
        return //ne poursuit pas le code 
    }
    fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({email: email, password: password}),
        })
        .then(res => {
            console.log("res: ", res);
            if (res.status == 200) {
                errorMessage.innerHTML = "Connecté !";
                return res.json();
            }
            else if(res.status == 401) {
                errorMessage.innerHTML = "Accès non autrorisé";
            }
            else if (res.status == 404) {
                errorMessage.innerHTML = "Utilisateur non trouvé";
            } else {
                errorMessage.innerHTML = "Erreur " +res.status;
            }
            })
            .then(data => {
                console.log("data: ", data);
                if (data) {
                window.localStorage.setItem("data", JSON.stringify(data));
                window.location.href = "./index.html"
            }
            })
            .catch(error => console.error(error));
        });