class Home extends Component {
    constructor(name, toLanding) {
        super(`<section class="home">
        <h1>Welcome, ${name}!</h1>
        <a href="" class="anchors">Latest News</a>
        <a href="" class="anchors">Google Something</a>
        <a href="" class="anchors">Search Users</a>
        <button>Logout</button>
    </section>`)
    
        const button = this.container.querySelector('button')
        
        const anchors = this.container.querySelectorAll('a')

        let result

        const news = anchors[0]
        const navigator = anchors[1]
        const searchUsers = anchors[2]

        const lastnews = new News()
        const googleNavigator = new Navigate()
        const users = new Search(query => {
            if (query.trim().length > 0 && typeof query != 'undefined') {
                if (result) this.container.removeChild(result.container)
                result = new Results(query)
                
                users.container.appendChild(result.container)
            }
        })
        
        let current = lastnews.container
        news.style.backgroundColor = '#FA8072'

        button.addEventListener('click', () => {
            toLanding()
        })

        this.container.append(lastnews.container)

        news.addEventListener('click', event => {
            replaceSection(lastnews)

            news.style.backgroundColor = '#FA8072'
        })

        navigator.addEventListener('click', event => {
            replaceSection(googleNavigator)

            navigator.style.backgroundColor = '#FA8072'
        })

        searchUsers.addEventListener('click', event => {
            replaceSection(users)

            searchUsers.style.backgroundColor = '#FA8072'
        })

        const replaceSection = section => {
            event.preventDefault()

            anchors.forEach(anchor => anchor.style.backgroundColor = '#FFA07A')

            current.replaceWith(section.container)

            current = section.container
        }
    }   
}

