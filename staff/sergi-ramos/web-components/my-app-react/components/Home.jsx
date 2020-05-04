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
    handleRetriveTweets = () => {
        const tweets = retrieveTweets(this.props.email, this.props.token, (error, tweets) => {
            if (error) console.log(error) //TODDO feedback
            else {
                this.setState(
                    {
                        currentLink: 'twitter',
                        tweet: tweets
                    })
            }
        })
    }


    handleonTwitter = (event) => {
        event.preventDefault()
        this.handleRetriveTweets()
    }

    // handleOnEcosia = (event) => {
    //     event.preventDefault()

    //     this.setState(
    //         { currentLink: 'ecosia' }
    //     )
    // }
    // handleOnSport = (event) => {
    //     event.preventDefault()

    //     this.setState(
    //         { currentLink: 'sport' }
    //     )
    // }

    render() {
        return <section className="home">
            <h1>Wellcome {`${this.props.name} ${this.props.surname}`}</h1>
            <button onClick={this.props.logOut}>Logout</button>
            <a onClick={this.handleOnUsers} className="home__link" href="">Users</a>
            <a onClick={this.handleOnGoogle} className="home__link" href="">Google</a>
            <a onClick={this.handleonTwitter} className="home__link" href="">Twitter</a>
            <a className="home__link" href="">Ecosia</a>
            <a className="home__link" href="">Sport</a>

            {this.state.currentLink === 'user' && <Users token={this.props.token} following={this.props.following}/>}
            {this.state.currentLink === 'google' && <Google />}
            {this.state.currentLink === 'ecosia' && <Ecosia />}
            {this.state.currentLink === 'twitter' && <Twitter  retrieveTweets={this.handleRetriveTweets} resultsTweet={this.state.tweet} token={this.props.token} name={this.props.name} />}
            {/* {this.state.currentLink === 'sport' && <Sport />} */}
        </section>
    }
}

