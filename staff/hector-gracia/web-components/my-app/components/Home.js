
function Home(name,onLogOut){
    const temp=document.createElement("div");

    temp.innerHTML = `<span> 
    <h1>Welcome ${name}</h1>
    <button>Log out</button>
    <form method="GET">
    <input type="text" name = 'text'>
    <button>🦗</button>
    </form>
    </span>`

    const container=temp.firstChild;
    let button=container.querySelector("button");
    button.addEventListener("click",function(event){
        event.preventDefault();
        onLogOut();
    })

    

    const searchBar = container.querySelector('form')
    searchBar.addEventListener('submit', function(event){
        event.preventDefault();
        var input = event.target.text.value

        var results = searchUser(input)
        var search = Search()
        var temp
        if(!results){
            temp = document.createElement('p')
            temp.innerHTML = 'no users found'
            
        } 
        for (i in results){
            temp = document.createElement("li");
            temp.innerHTML=`${results[i].name} ${results[i].surname}, ${results[i].email}`
            search.appendChild(temp)      
        }
        //añadir componente
        //append.Find(nombre, apellido, correo)
           // ul.appendChild(`<li>${results[i]}</li>`)
        container.appendChild(search)
            
    })
    //Añade el boton de añadir mensajes
    container.appendChild(Send(sendPete,name));
    return container;
}