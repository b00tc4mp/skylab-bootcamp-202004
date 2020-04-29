class Home extends Component {
    constructor(name, onLogout) {
        super(`<section class="home">
        <h1>Hello ${name}, Welcome!</h1><button id="logout">Logout</button>
        <div class="w3-bar w3-black">
            <button id="users" class="w3-bar-item w3-button tablink w3-red">Users</button>
            <button id="google" class="w3-bar-item w3-button tablink">Google</button>
            <button id="ecosia" class="w3-bar-item w3-button tablink">Ecosia</button>
            <button id="news" class="w3-bar-item w3-button tablink">News</button>
        </div>
    </section>`);

        const button = this.container.querySelector('#logout')
        button.addEventListener('click', () => onLogout())

    const users = new Users();
    const google = new Google();
    const ecosia = new Ecosia();
    const news = new News();

    let currentComponent = users;
    this.container.appendChild(currentComponent.container);

    const usersButton = this.container.querySelector('#users')
    let currentButton = usersButton;

    usersButton.addEventListener('click', function () {
        event.preventDefault()

        currentComponent.container.replaceWith(users.container)
        currentComponent = users;

        currentButton.classList.toggle('w3-red')
        currentButton = usersButton;
        currentButton.classList.toggle('w3-red')

    })

    const googleButton = this.container.querySelector('#google')
    googleButton.addEventListener('click', function () {
        event.preventDefault()

        currentComponent.container.replaceWith(google.container)
        currentComponent = google;

        currentButton.classList.toggle('w3-red')
        currentButton = googleButton;
        currentButton.classList.toggle('w3-red')

    })
    
    const ecosiaButton = this.container.querySelector('#ecosia')
    ecosiaButton.addEventListener('click', function () {
        event.preventDefault()

        currentComponent.container.replaceWith(ecosia.container)
        currentComponent = ecosia;

        currentButton.classList.toggle('w3-red')
        currentButton = ecosiaButton;
        currentButton.classList.toggle('w3-red')

    })

    const newsButton = this.container.querySelector('#news')
    newsButton.addEventListener('click', function () {
        event.preventDefault()

        currentComponent.container.replaceWith(news.container)
        currentComponent = news;

        currentButton.classList.toggle('w3-red')
        currentButton = newsButton;
        currentButton.classList.toggle('w3-red')

    })

    };
};
