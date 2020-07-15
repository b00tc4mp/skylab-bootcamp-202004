class Tweeter extends Component {
    constructor(props){
        super(props)

        this.state = ({onTweet: undefined})
        this.state = ({onMenu: undefined})
        this.state = ({error: undefined})
        this.state = ({newFollow: undefined})
        this.state = ({newTweet: undefined})
        this.state = ({tweeterView: undefined})
        this.state = ({menuOptionAll: 'tweeter__menu--display--onAll'})
        this.state = ({menuOptionUser: ''})
    }

    //  || component mount ||

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

    //  || Follow functions ||

    handelFollow = (id) => {
        this.props.newFollower(id)
        this.setState({newFollow: true})
    }

    handelUnFollow = (id => {
        this.props.unFollow(id)
        this.setState({newFollow: false})

    })

    handelFollowed = (id) => { //hacer que se actualize del servidor el userInfo cada vez que se le añade o quita un seguidor igual que con los tweets (seguramente llamado a la funcion asincrona aquie dentro tambien.. los updates de el usuario en el servidor)
        if(this.props.userInfo.following){
            for(var i in this.props.userInfo.following){
                if(this.props.userInfo.following[i] === id){
                    return true
                }
            }
        }
        return false
    }

    //  || New tweet fucntions ||

    handelSubmit = (event) => {
        event.preventDefault()
        setTimeout(()=>{
            this.loadTwitts()
            this.setState({newTweet: undefined})
        },this.props.sendNewTweet(event.target.tweet.value)) 
        
        
    }

    render= () => {
        return <section className="tweeter" >
            <div className="tweeter__header" onClick = { (event) => {event.stopPropagation()}}>
                <i class="fas fa-bars fa-2x" onClick = { () => {this.setState({onMenu : 'on'})}}></i>
                <i className="fab fa-twitter fa-2x"></i>
                {this.props.spiner && <i className={this.props.spiner}></i>}
            </div>
           {this.state.onMenu && <div className="tweeter__menu" onClick = { () => {this.setState({onMenu : undefined})}}>
                <div className="tweeter__menu--display" onClick = { (event) => {event.stopPropagation()}}>
    <h2>{this.props.userInfo.name} {this.props.userInfo.surname}</h2>
                    <div className="tweeter__menu--folowers"> 
                        {!this.props.userInfo.following && <span className="tweeter__menu--folowers-folowing"> {this.props.userInfo.following.lengt} folowing </span>} 
                        {this.props.userInfo.following && <span className="tweeter__menu--folowers-folowing"> folowing </span>} 
                        <span className="tweeter__menu--folowers-folowers">folowers</span>
                    </div>
                    <h3 className = {this.state.menuOptionAll} onClick = { () => {this.setState({tweeterView: undefined}), this.setState({onMenu : undefined}), this.setState({menuOptionAll: 'tweeter__menu--display--onAll'}), this.setState({menuOptionUser: ''})}}>All tweets</h3>
                    <h3 className = {this.state.menuOptionUser} onClick = { () => {this.setState({tweeterView: 'following'}), this.setState({onMenu : undefined}), this.setState({menuOptionUser: 'tweeter__menu--display--onUser'}), this.setState({menuOptionAll: ''})}}>Following tweets</h3>
                    <h3>Following</h3>
                    <h3>Mas cosas</h3>
                </div>
            </div>}
            <div className="tweeter__home" onClick = { () => {this.setState({newTweet: undefined})}}>
                
                
                {this.props.results && <Tweets results = {this.props.results} onFollow = {this.handelFollow} ifFollowed = {this.handelFollowed} onUnFollow = {this.handelUnFollow} user = {this.props.userInfo} view = {this.state.tweeterView}/>}
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

//{this.props.results && <Tweets results = {this.props.results} onFollow = {this.handelFollow} ifFollowed = {this.handelFollowed}/>}