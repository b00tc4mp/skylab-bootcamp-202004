function Home(loggeduser, callback) {
    const temp = document.createElement('div')
    temp.innerHTML = `<section class="home">
        <h1>Home</h1>
        <p>Hello, ${loggeduser.name}</p>
        <button>Logout</button>
    </section>`

    const container = temp.firstChild
    const button = container.querySelector('button')
    button.addEventListener('click', function(){ 
        home.replaceWith(landing)
        login.querySelector('form')[0].value = ''
        login.querySelector('form')[1].value = ''
    
    })
    return container
}