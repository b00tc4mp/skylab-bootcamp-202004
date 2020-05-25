class User extends Component{
    constructor(props){
        super()
        this.state={user: props.user}
    }
    handleFollow=event=>{
        event.preventDefault();
        this.props.onFollow(this.props.user.id)
    }
    render(){
        return <section className="pete__message">
            <h3>{this.props.user.name} {this.props.user.surname}</h3> <br/>
            <h1>{this.props.user.email}</h1>
            <button className="peter__button" onClick={this.handleFollow}>{this.props.user.following ? "UNFOLLOW":"FOLLOW" }</button>
        </section>
    }
}