// TODO show "Welcome, <name>!"
function Home(name, onLogout){
    const temp= document.createElement("div");

    temp.innerHTML = ` <section> 
    <span> Welcome ${name} </span>
    <input id="search" type="text" name="search" placeholder="search">
    <button id="logout">Logout</button>
    <ul id="listusers"></ul>
    </section>`

    

    const container = temp;

    const input = container.querySelector("#search")

    const listUsers = container.querySelector("#listusers")



    
    input.addEventListener("keyup", (event)=>{
        const _users = searchUsers(event.target.value)
        
        listUsers.innerHTML = ''
        
        _users.forEach(user=>{

            var listElements = document.createElement("li");
            listElements.appendChild(document.createTextNode(user.name + ' ' + user.surname));
            listUsers.appendChild(listElements);

            //listUsers.innerHTML += `<p> ${user.name} </p>`
        })
        
    })

    const logout = container.querySelector("#logout")
    logout.addEventListener("click",function(){
        onLogout()
    })

    return container;
}

