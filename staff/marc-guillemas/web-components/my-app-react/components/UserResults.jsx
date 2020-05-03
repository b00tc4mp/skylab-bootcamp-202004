const {Components} = React;

class UserResults extends Component {
    constructor(props){
        super(props)
        
        this.state ={
            view:'',
            followers: undefined, 
            buttonStatus: undefined
        }   
    }

    handleOnFollow = (event,id) =>{
   

        if(event.target.innerText === "follow"){
            event.target.innerText = "following"
        //     // this.state.followers.push(id)
        //     const eventually = this.state.followers
        //     eventually.push(id)
        //     this.setState({followers: eventually})
        //     // Patch
        //   try{
        //     updateUser(this.props.token, this.state.followers, (error) => {
        //         if(error) throw error
        //     })
        //     event.target.innerText = "unfollow"
        //   } catch(error){
        //       if(error) throw error
        //   } 
           
        }
       
    }
    componentDidMount(){
        checkFollow(this.props.token,(error,followers)=>{
            if(error) throw error
            this.setState({followers})
        })
    }

    // followOrNot = (id) =>{
    //     if(this.state.followers.includes(id)){
    //         return'Following'
    //     }else{
    //         return 'Follow'
    //     }
    // }
    render(){
        
    return <section className="results">
        {
           this.props.users.length ?
                <ul>{this.props.users.map(({ name, surname, email, id }) => <li><hr />{`${name} ${surname} ${id}`} <br/> 
                {`${email}`} <button onClick={this.handleOnFollow(id)}>{(this.state.followers === undefined || this.state.followers.includes(id)  ? `${"unfollow"}` : `${"follow"}`)}</button></li>)}</ul>
                : <Feedback message="sorry, theres no results :(" level="warning" />
        }
    </section>
    }
}
// `${followOrNot(id)}`

  // handleChangeFollowStatus = (id) => {
        
       
                
    // const checkFollow = (email, loggedUser)=> {
    //     debugger
    //     if(loggedUser.twitter.following)
    //         if(loggedUser.twitter.following.indexOf(email) !== -1)
    //          return 'Following'
    //         else
    //         return 'Follow'
    // }

    // }
  