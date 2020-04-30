// class Home extends Component {
//     constructor(name, onLogout) {

//         super(`<section class="home">
//                 <h1'>Welcome ${name} !</h1>
//             <button>Log out</button>
//         </section>`)

//         const button = this.container.querySelector('button');

//         button.addEventListener('click', function () {
//             event.preventDefault();

//             onLogout()
//         });

//         let results

//         const search = new Search((request, requestGoogle, requestEcosia) => {
//             if (results) {
//                 this.container.removeChild(results.container);
//                 results = undefined
//             }
//             if (request) {
//                 const usersFound = searchUsers(request);
//                 results = new Results(usersFound);
//                 this.container.appendChild(results.container);
//             }

//             if (requestGoogle) {
//                 searchGoogle(requestGoogle, (error, listResults) => {
//                     results = new SearchResults(listResults);
//                     this.container.appendChild(results.container);
//                 })
//             }

//             if (requestEcosia) {
//                 searchEcosia(requestEcosia, (error, listResults) => {
//                     results = new SearchResults(listResults);
//                     this.container.appendChild(results.container);
//                 })
//             }
//         });

//         this.container.appendChild(search.container);

//         dailyNews(result =>{
//             const NewsResults = new News (result)
//             this.container.appendChild(NewsResults.container)
//         })

//     }
// }   

class Home extends Component {
    constructor(props) {
        super(props)


        this.state = {
            view: 'home',
            tweets: undefined
        }
    }

    // handleTweeter = (event) => {
    //     event.preventDefault()

    //     this.setState({view: 'tweeter'})
    // }

    handleRetriveTweets = (event) => {
        event.preventDefault()
        const myTweets =  retrieveTweets(this.props.userEmail)

        this.setState({tweets: myTweets, view: 'tweeter'})
    }

    handleGoToLogout = event => {
        event.preventDefault();

        this.props.onLogout()
    }

    render() {
        return <section className="home">
            <h1>Welcome {this.props.name}!</h1>
            <a className="home__link" href="">Users  </a>
            <a className="home__link" href="">Google  </a>
            <a className="home__link" href="">Ecosia  </a>
            <a className="home__link" href="" onClick={this.handleRetriveTweets}>Tweeter </a>
            <button onClick={this.handleGoToLogout}>Log out</button>

            <News />
           {this.state.view === 'tweeter' && <Tweeter tweetList = {this.state.tweets}/>}
        </section>
    }
}