// TODO show "Welcome, <name>!"
function Home(name, onLogout){
    const temp= document.createElement("div");

    temp.innerHTML = ` <section> 
    <span> Welcome ${name} </span>
    <button id="logout">Logout</button>
    </section>`


    const container = temp;

    let results
    
    const searchComponent = Search(function(query){
        const _users = searchUsers(query)
        if (!results) {
            results = Results(_users)

            container.appendChild(results)
        } else {
            const _results = results

            results = Results(_users)

            _results.replaceWith(results)
        }
    
    })

    container.appendChild(searchComponent)

    const logout = container.querySelector("#logout")
    logout.addEventListener("click",function(){
        onLogout()
    })

    return container;
}

