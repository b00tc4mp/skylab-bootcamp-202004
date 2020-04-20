function Home(name, surname) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="Home">
    <h1>Welcome, ${name} ${surname} </h1>
</section>`

    const container = temp.firstChild

    return container
}