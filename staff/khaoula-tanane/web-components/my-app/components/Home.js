// TODO show "Welcome, <name>!"
function Home(name, onLogout){
    const temp= document.createElement("div");

    temp.innerHTML = ` <section> 
    <span> Welcome ${name} </span>
    <button id="logout">Logout</button>
    </section>`

    const container = temp;

    const logout = container.querySelector("#logout")
    
    logout.addEventListener("click",function(){
        onLogout()
    })

    return container;
}
