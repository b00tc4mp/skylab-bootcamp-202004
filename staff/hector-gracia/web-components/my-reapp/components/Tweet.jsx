class Tweet extends Component{
    constructor(props){
        super()
    }
    render(){
        return <section className="pete__message">
            <h1>{this.props.user.name} {this.props.user.surname}</h1>
            <p>{this.props.tweet.message}</p>

        </section>
    }
}