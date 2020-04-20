// TODO show "Welcome, <name>!"
function Home(user) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="home">
    <h1>Bienvenido ${user}</h1>
</section>`

    const container = temp.firstChild

    return container
}




