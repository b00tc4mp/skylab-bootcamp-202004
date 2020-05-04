class Tweeter extends Component {
    constructor(props){
        super(props)

        this.state = ({onTweet: undefined})
        this.state = ({onMenu: undefined})
        this.state = ({error: undefined})
        this.state = ({newFollow: undefined})
        this.state = ({newTweet: undefined})
    }

    componentDidMount(){
        this.loadTwitts()
    }

    loadTwitts = () => {
        this.props.loadSpiner()
        try{
            this.setState({newFollow: undefined})
            allTweets(this.props.token, (error, result) => {
                this.props.loadSpiner()    
                if(error){
                    this.setState({error: message}) 
                }else{
                    this.props.loadTweets(result)
                }
            })
        }catch({message}){
            this.props.loadSpiner()
            this.setState({error: message})
        }
    }

    handelFollow = (id) => {
        this.props.newFollower(id)
        this.setState({newFollow: true})
    }

    handelFollowed = (id) => {
        if(this.props.userInfo.following){
            for(var i in this.props.userInfo.following){
                if(this.props.userInfo.following[i] === id){
                    return true
                }
            }
        }
        return false
    }

    handelSubmit = (event) => {
        event.preventDefault()
        this.props.sendNewTweet(event.target.tweet.value)
        this.setState({newTweet: undefined})
        this.loadTwitts()
        
    }
 //arglar lo de los foloeings
    render= () => {
        return <section className="tweeter" >
            <div className="tweeter__header" onClick = { (event) => {event.stopPropagation()}}>
                <i class="fas fa-bars fa-2x" onClick = { () => {this.setState({onMenu : 'on'})}}></i>
                <i className="fab fa-twitter fa-2x"></i>
            </div>
           {this.state.onMenu && <div className="tweeter__menu" onClick = { () => {this.setState({onMenu : undefined})}}>
                <div className="tweeter__menu--display" onClick = { (event) => {event.stopPropagation()}}>
    <h2>{this.props.userInfo.name} {this.props.userInfo.surname}</h2>
                    <div className="tweeter__menu--folowers"> 
                        {!this.props.userInfo.following && <span className="tweeter__menu--folowers-folowing"> {this.props.userInfo.following.lengt} folowing </span>} 
                        {this.props.userInfo.following && <span className="tweeter__menu--folowers-folowing"> folowing </span>} 
                        <span className="tweeter__menu--folowers-folowers">folowers</span>
                    </div>
                    <h3>User</h3>
                    <h3>Following</h3>
                    <h3>Mas cosas</h3>
                </div>
            </div>}
            <div className="tweeter__home" onClick = { () => {this.setState({newTweet: undefined})}}>
                {this.props.spiner && <i className={this.props.spiner}></i>}
                {this.props.results && <Tweets results = {this.props.results} onFollow = {this.handelFollow} ifFollowed = {this.handelFollowed}/>}
                <i class="fas fa-comment-medical fa-4x" onClick = { (event) => {event.stopPropagation(), this.setState({newTweet : 'on'})}}></i>
                {this.state.newTweet && <div className="riteTweet" onClick = { (event) => {event.stopPropagation()}}>
                    <form onSubmit={this.handelSubmit}>
                        <label for="tweet">What are you thinking</label>
                        <textarea name="tweet" maxlength="240 " placeholder="Rite something.."></textarea>
                        <button className="submit">Tweet</button>
                    </form>
                </div>}
            </div>
        </section>
    }
}