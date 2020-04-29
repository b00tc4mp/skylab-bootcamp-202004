const { Component } = React

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = { currentLink: 'user' }

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

    handleOnEcosia = (event) => {
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
  
    render() {
        return <section className="home">
                    <h1>Wellcome {this.props.user}</h1>
                    <button onClick={this.props.logOut}>Logout</button>
                    <a onClick={this.handleOnUsers} className="home__link" href="">Users</a>
                    <a onClick={this.handleOnGoogle} className="home__link" href="">Google</a>
                    <a onClick={this.handleOnEcosia} className ="home__link" href="">Ecosia</a>
                    <a onClick={this.handleOnNews} className="home__link" href="">Mediavida</a>

                    {this.state.currentLink === 'user' && <User />}
                    {this.state.currentLink === 'google' && <Google />}
                    {this.state.currentLink === 'ecosia' && <Ecosia />}
                    {this.state.currentLink === 'medivida' && <HomeNews />}

               </section>
    }
}

