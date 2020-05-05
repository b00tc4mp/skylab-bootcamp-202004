class Tweets extends Component{
    constructor(){
        super()

        this.state={
            error: undefined,
            success: undefined
        }
    }
     
    handleToToggle = event => {
        event.preventDefault()
        
        this.props.toggle(id)
    }
    
    render(){
        return<section>
            {this.props.tweets && <ul>
                {this.props.tweets.map(({message, date, username}) =>
                <li>
                        <p>{message}</p>
                        <details>
                            <p>{date}</p>
                            <p className="username">{username}</p>
                        </details>    
                </li>
            )}
        </ul>}
    </section >
    } 
}