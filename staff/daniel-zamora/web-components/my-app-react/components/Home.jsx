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

    render() {
        return <section className="home">
                    <h1>Wellcome {this.props.user}</h1>
                    <button onClick={this.props.logOut}>Logout</button>
                    <a onClick={this.handleOnUsers} className="home__link" href="">Users</a>
                    <a onClick={this.handleOnGoogle} className="home__link" href="">Google</a>
                    <a className="home__link" href="">Ecosia</a>
                    <a className="home__link" href="">Sport</a>

                    {this.state.currentLink === 'user' && <Users />}
                    {this.state.currentLink === 'google' && <Google />}

               </section>
    }
}

