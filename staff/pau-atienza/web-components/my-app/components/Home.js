function Home(user) {
    const temp = document.createElement('div')
    temp.innerHTML = `<section class="home">
        <h1>Home</h1>
        <p>Hello, ${user.name}</p>
        <button>Logout</button>
    </section>`

    const container = temp.firstChild
    const button = container.querySelector('button')
    button.addEventListener('click', function(){ 
        home.replaceWith(landing)
    
    })
    return container
}