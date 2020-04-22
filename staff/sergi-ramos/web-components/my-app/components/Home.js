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

   

    return container
}




