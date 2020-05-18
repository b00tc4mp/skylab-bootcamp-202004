class Home extends Component {debugger
  constructor(name, callback) {
    super(`<section class="home">
    <h1>Welcome, ${name}!</h1>
    <ul class="nav">
    <li><a class="home__link" href="">Users</a></li>
    <li><a class="home__link" href="">Google</a></li>
    <li><a class="home__link" href="">Ecosia</a></li>
    <li><a class="home__link" href="">Mediavida</a></li>
    </ul>  
    <button>Logout</button>
</section>`);

    const button = this.container.querySelector("button");

    button.addEventListener("click", function () {
      callback();
    });

const users = new Users
const google = new GoogleSearch
const ecosia = new EcosiaSearch
const homeNew = new HomeNews

let currentBody = users

this.container.appendChild(currentBody.container)

const [userLink, googleLink, ecosiaLink, homeLink] = this.container.querySelectorAll('a')

    googleLink.addEventListener('click', event => {debugger
      event.preventDefault()

      currentBody.container.replaceWith(google.container)
      
      currentBody = google
    })
  
    ecosiaLink.addEventListener('click', event => {debugger
      event.preventDefault()

      currentBody.container.replaceWith(ecosia.container)

      currentBody = ecosia
    })

    userLink.addEventListener('click', event => {debugger
      event.preventDefault()

      currentBody = users
    })

    homeLink.addEventListener('click', event => {debugger
      event.preventDefault()

      currentBody.container.replaceWith(homeNew.container)

      currentBody = homeNew
    })
  
  }
}
