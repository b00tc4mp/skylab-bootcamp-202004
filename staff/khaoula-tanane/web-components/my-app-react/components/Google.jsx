class Google extends Component{
    constructor(){
        super()

        this.state = {
            googleData: null
        }
    }

    handleGoogleSearch = (query) => {
        google(query, (error, googleData)=>{
          try{
            this.setState({googleData})  
          }
          catch(error){
            console.log(error.message)
          }
        })
    }

    render(){

        return <section>
          <SearchGoogle onSubmit={this.handleGoogleSearch} />
          <GoogleResults googleData={this.state.googleData}/>
        </section>
        
    }
}
