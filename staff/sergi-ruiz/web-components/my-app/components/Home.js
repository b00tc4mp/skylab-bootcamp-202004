function Home(name) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="home">
    <h1>Welcome, ${name}!</h1>

    </section>`

    const container = temp.firstChild

    return container
}