class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            home: 'user'
        }
    }

    handleSearchBar = (input) => this.setState({home: input})

    render(){
        return <section className="home">
             <h1>Welcome, ${name}!</h1>
             <a href = '' onClick = {(event) =>{event.preventDefault()}}>Logout</a>
             <a href = '' onClick = {(event) =>{event.preventDefault(); this.handleSearchBar('user')}}>Users Search</a>
             <a href = '' onClick = {(event) =>{event.preventDefault(); this.handleSearchBar('google')}}>Google Search</a>
             <a href = '' onClick = {(event) =>{event.preventDefault(); this.handleSearchBar('hola')}}>Hola News</a>
                {this.state.home === 'user' && <UserSearch/>}
                {this.state.home === 'google' && <SearchGoogle/>}
                {/* {this.state.view === 'hola' && <HolaNews/>} */}
         </section>
    }
}

