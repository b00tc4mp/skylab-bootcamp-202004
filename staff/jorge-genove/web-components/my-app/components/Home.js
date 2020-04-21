function Home(name, callback) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="home">
    <h1>Welcome, ${name}!</h1><button>Logout</button>
</section>`

    const container = temp.firstChild

    const button = container.querySelector('button')
    
    const search = Search()

    container.append(search)

    button.addEventListener('click', function() {
        callback()
    })
   
    
    return container
}