// TODO show "Welcome, <name>!"
function Home(user, logOut) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="home">
    <h1>Bienvenido ${user}</h1>
    <button>Logout</button>
</section>`

    const container = temp.firstChild

    const search = Search()

    container.appendChild(search)



    const logOutButton = container.querySelector('button')

    logOutButton.addEventListener('click', function () {

        logOut()
    })
let result
    const searchButton = container.querySelector('form')
    searchButton.addEventListener('submit', function (event) {
        debugger

        event.preventDefault()
        const query = event.target.query.value      
        const user = searchUser(query)
        if (!result) {
            result = Result(user)
            container.append(result)
        }else{
            container.removeChild(result)
            result = undefined
            result = Result(user)
            container.append(result)
        }
        
    })


   

    return container
}




