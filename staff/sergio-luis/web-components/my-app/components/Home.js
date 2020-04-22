function Home(name, callback){

    const template = document.createElement('div');

    template.innerHTML = `<main class='main'>
    <h1 class='main__title'>Welcome ${name}</h1>
    <button class="main__button">Exit</button>
</main>`;

    const container = template.firstChild;

    const button = container.querySelector('button');

    button.addEventListener('click', function() {
        callback()
    })

    return container
}
