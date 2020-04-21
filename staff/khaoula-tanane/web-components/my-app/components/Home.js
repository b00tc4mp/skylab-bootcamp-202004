// TODO show "Welcome, <name>!"
function Home(name, onLogout){
    const temp= document.createElement("div");

    temp.innerHTML = ` <section> 
    <span> Welcome ${name} </span>
    <input id="search" type="text" name="search" placeholder="search">
    <button id="logout">Logout</button>
    <div id="listusers"></div>
    </section>`

    const container = temp;

    const input = container.querySelector("#search")

    const listUsers = container.querySelector("#listusers")
    
    input.addEventListener("keyup", (event)=>{
        console.log(event.target.value)
        const _users = searchUsers(event.target.value)
        console.log(_users)

        listUsers.innerHTML = ''

        _users.forEach(user=>{
            listUsers.innerHTML += `<p> ${user.name} </p>`
        })
        
    })

    const logout = container.querySelector("#logout")
    logout.addEventListener("click",function(){
        onLogout()
    })

    return container;
}
