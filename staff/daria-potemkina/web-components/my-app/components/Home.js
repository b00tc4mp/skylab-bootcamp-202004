function Home(name, onLogout) {

    const temp = document.createElement('div')

    temp.innerHTML = `<section class="home">
    <h1>Welcome ${name} !</h1>
    <button>Log out</button>
    </section>`

    const container = temp.firstChild;
    const button = container.querySelector('button');


    button.addEventListener('click', function () {
        event.preventDefault();

        onLogout()
    })

    return container
} 