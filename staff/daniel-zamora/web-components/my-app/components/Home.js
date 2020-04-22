// TODO show "Welcome, <name>!"
function Home(name, callback) {
    const temp = document.createElement('div')

    temp.innerHTML = `<section class="home">
    <h1>Welcome, ${name}!</h1><button>Logout</button>
    </section>`

    const container = temp.firstChild;

    const button = container.querySelector('button');

    button.addEventListener('click', function() {
        callback()
    })
   
    const search = Search(function(query){
        return searchUsers(query)
    })

    container.appendChild(search);


    return container;
}

