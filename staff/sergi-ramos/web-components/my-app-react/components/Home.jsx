const { Component } = React

class Home extends Component {
    constructor(props) {
        super(props)
    this.state
    }
    render() {
        return  <section className="home">
                <h1>Wellcome {this.props.user}</h1>
                <button onClick = {this.props.logOut}>Logout</button>
                <Search />
            </section>
           

    } 
}

