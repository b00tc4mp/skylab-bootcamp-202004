const {Components} = React;

class UserResults extends Component {
    constructor(props){
        super(props)
        
        this.state ={
            view:'',
            followers: undefined        
        }   
    }

    componentDidMount(){
        checkFollow(this.props.token,(error,followers)=>{
            if(error) throw error
            this.setState({followers})
        })
    }

    followOrNot(id){
        if(this.state.followers.includes(id)){
            return 'Following'
        }else{
            return 'Follow'
        }
    }
    render(){
        
    return <section className="results">
        {
           this.props.users.length ?
                <ul>{users.map(({ name, surname, email, id }) => <li><hr />{`${name} ${surname} ${id}`} <br/> 
                {`${email}`} <button>{this.followOrNot(id)}</button></li>)}</ul>
                : <Feedback message="sorry, nohandl results :(" level="warning" />
        }
    </section>
    }
}


  // handleChangeFollowStatus = (id) => {
        
       
                
    //     // const checkFollow = (email, loggedUser)=> {
    //     //     debugger
    //     //     if(loggedUser.twitter.following)
    //     //         if(loggedUser.twitter.following.indexOf(email) !== -1)
    //     //          return 'Following'
    //     //         else
    //     //         return 'Follow'
    //     // }

    // }
  