const { Component } = React
class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentLink: 'user',
            tweet: undefined
        }

    }
    handleOnGoogle = (event) => {
        event.preventDefault()

        this.setState(
            { currentLink: 'google' }
        )
    }
    handleOnUsers = (event) => {
        event.preventDefault()

        this.setState(
            { currentLink: 'user' }
        )
    }
    handleonTwitter = (event) => {
        event.preventDefault()
        const tweets = retrieveTweets(this.props.userEmail)
        this.setState(
            {
                currentLink: 'twitter',
                tweet: tweets
            }
        )
    }



    render() {
        return <section className="home">
            <h1>Hola super {this.props.name}</h1>
            <button onClick={this.props.logOut}>Logout</button>
            <a onClick={this.handleOnUsers} className="home__link" href="">Users</a>
            <a onClick={this.handleOnGoogle} className="home__link" href="">Google</a>
            <a onClick={this.handleonTwitter} className="home__link" href="">Twitter</a>
            {/* <a className="home__link" href="">Ecosia</a>
            <a className="home__link" href="">Sport</a> */}

            {this.state.currentLink === 'user' && <Users />}
            {this.state.currentLink === 'google' && <Google />}
            {this.state.currentLink === 'ecosia' && <Ecosia />}
            {this.state.currentLink === 'twitter' && <Twitter resultsTweet={this.state.tweet}/>}
            {/* {this.state.currentLink === 'sport' && <Sport />} */}
        </section>
    }
}

