class Tweet extends Component{
    constructor(){
        super()

        this.state={
            error: undefined,
            success: undefined
        }
    }

    handleSubmit(event){
        event.preventDefault()
 
        let message = event.target.message.value
        tweet(this.prop.token,message,(error,success)=>{
            if(error) setState ="error"
            else setState="succes"
        })
    }
    render(){
    return <section className="tweet">
         <form onSubmit={this.handleSubmit}>
        <input type="text" name="tweet"/>
        <button>Twitear</button>
            {this.state.success && <Feedback message={this.state.success} level="undefined" />}
            {this.state.error && <Feedback message={this.state.error} level="error" />}
        </form>
    </section>
    }
}