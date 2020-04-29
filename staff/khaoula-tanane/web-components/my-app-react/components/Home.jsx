class Home extends Component{
    constructor(props){
        super()

        this.state = {
            foundUsers: []
        }  
    }

    handleSearchUsers = (query) => {
        const foundUsers = searchUsers(query)
        this.setState({foundUsers})  

    }

    render(){
        return <>
        <section className="login">
        <h1>{`HOME: Welcome `}</h1>

        <Search onSubmit={this.handleSearchUsers} />
        <UsersResults foundUsers={this.state.foundUsers}/>

        <Google />
        </section>
    </>
}
}