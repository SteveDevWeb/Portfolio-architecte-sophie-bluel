export const isAuth = () => {
    const data = window.localStorage.getItem("data")
    console.log(data)
    if (data!=null) {
        document.querySelector("#auth").innerHTML="logout"
        document.querySelector("#auth").setAttribute("href","#")
        document.querySelector("#auth").addEventListener("click",() => {
            window.localStorage.removeItem("data")
            document.querySelector("#auth").innerHTML="login"
            document.querySelector("#auth").setAttribute("href","index.html")
        })
    }
}