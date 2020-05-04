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
        // toggleFollowUser(token, id ,(error,succes)=>{
        //     {this.state.success && <Feedback message={this.state.success} level="undefined" />}
        //     {this.state.error && <Feedback message={this.state.error} level="error" />}
        // })
    }
    render(){
        return<section>
            {this.props.tweets && <ul>
                {this.props.tweets.map(({message, date, username ,id}) =>
                <li>

                        <p>{message}</p>
                        <details>
                            <p>{date}</p>
                            <p className="username">{username}</p>
                        </details>
                        
                        <button onClick={this.handleToToggle}>{this.props.toggle}</button>
                        : <Feedback message="sorry, no results :(" level="warning" />
    
                </li>
            )}
        </ul>}
    </section >
    } 
}