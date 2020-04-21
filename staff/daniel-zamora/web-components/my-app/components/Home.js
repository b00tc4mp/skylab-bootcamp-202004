// TODO show "Welcome, <name>!"

function Home(name, surname, callback) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="home">
    <h1>Welcome, ${name} ${surname}!</h1><button>Logout</button>
</section>`

    const container = temp.firstChild

    const button = container.querySelector('button')

    button.addEventListener('click', function() {
        callback()
    })
    

    return container
}


