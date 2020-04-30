const { Component } = React

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = { currentLink: 'user' ,
                        
                      twitterresults: undefined,
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

    handleOnEcosia = (event) => {debugger
      event.preventDefault()
      this.setState(
        { currentLink: 'ecosia'}
      )
    }
    handleOnNews = (event) => {
        event.preventDefault()
        this.setState(
          { currentLink: 'mediavida'}
        )
      }
  
    handleOnTwitter = () => {
      event.preventDefault()
      retrieveTweets(this.props.useremail)
      this.setState({currentLink: 'twitter',
                    twitterresults: results
                
    })
  }


    render() {
        return <section className="home">
                    <h1>Wellcome {this.props.user}</h1>
                    <button onClick={this.props.logOut}>Logout</button>
                    <a onClick={this.handleOnUsers} className="home__link" href="">Users</a>
                    <a onClick={this.handleOnGoogle} className="home__link" href="">Google</a>
                    <a onClick={this.handleOnEcosia} className ="home__link" href="">Ecosia</a>
                    <a onClick={this.handleOnNews} className="home__link" href="">Mediavida</a>
                    <a onClick={this.handleOnTwitter} className= "home__link" href="">Twitter</a>

                    {this.state.currentLink === 'user' && <User />}
                    {this.state.currentLink === 'google' && <Google />}
                    {this.state.currentLink === 'ecosia' && <Ecosia />}
                    {this.state.currentLink === 'medivida' && <HomeNews />}
                    {this.state.currentLink === 'twitter' && <Twitter onClick= {this.handleOnTweetsResults} email = {this.props.email} results= {this.state.twitterresults}/>}

               </section>
    }
}

