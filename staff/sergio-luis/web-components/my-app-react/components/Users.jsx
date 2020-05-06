const {Component} = React;


class Users extends Component{
    constructor(){
        super()

        this.state ={
            users:undefined,
        }
    }

handleSubmit= (event) => {
    event.preventDefault();
    let { query } = event.target

    query = query.value
    this.props.onSubmit(query);
}
handleToggleFollow = () => {
    handleSubmit(query)
}


render(){
    return <>
    <section className="search">
    <form className='search__form' onSubmit={this.handleSubmit}>
        <img className='search__img' src='https://blog.digitalmanager.guru/wp-content/uploads/2018/03/users.png'/> 
        <div className='search__container'>
        <input className='search__input' type="text" name="query" required/>
            <button className='search__button' >🔍</button>
        </div>    
    </form>
    {this.props.users && <UsersResults users={this.props.users} token={this.props.token} onToggleFollow={this.handleToggleFollow} />}
    </section>
    </>
    }
}