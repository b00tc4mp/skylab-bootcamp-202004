class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            homeView: 'user',
            user: this.props.user,
            latestTweet: undefined
        }
    }

    changeSearchBar = (input) => this.setState({homeView: input })
      
    handleTweet = (event) =>{
        event.preventDefault()
        let email = this.state.user
        let text = event.target.tweet.value
        tweet(email, text)
        this.setState({latestTweet: text})

    }
    
    render(){
        return <>
            <NavBar callback = {this.changeSearchBar} name = {this.props.name}/>
            {this.state.homeView === 'user' && <UserSearch/>}
            {this.state.homeView === 'twitter' && <Twitter handleTweet = {this.handleTweet} email ={this.state.user}/>}

            {this.state.error && <Feedback message = {this.state.error} level = 'error'/>}
        </>
    }
}



// showUserSearch = (event) => {}
    // showGoogleSearch = (event) => {}
    // showEcosiaSearch = (event) => {}

{/* {this.state.searchBAr === 'user'&& <Search buttonName = {'User Search'} 
            buttonFunction = {this.showUserSearch}/>}

            {this.state.searchBAr === 'google'&& <Search buttonName = {'Google Search'} 
            buttonFunction = {this.showGoogleSearch}/>}

            {this.state.searchBAr === 'ecosia'&& <Search buttonName = {'Ecosia Search'} 
            buttonFunction = {this.showEcosiaSearch}/>} */}

// class Home extends Component{
//     constructor(user){
//         super(`<section class = 'home'> 
//                 <header>
//                     <h1>Welcome to the best website in the net, ${user.name}</h1>
//                     <button>Log out</button>
//                 </header>
//             </section>`)
//         const button = this.container.querySelector('button')
    
//         button.addEventListener('click', function(){ 
//             home.container.replaceWith(landing.container)
//         })
        
//         var main = Component.prototype.mount.call(undefined, `<div class = 'main'>
//         </div>`)
//         this.container.appendChild(main)

//         var searchbar = Component.prototype.mount.call(undefined, `<div class = 'searchbar'>
//             <h2>Search at your will</h2>
//         </div>`)
//         main.appendChild(searchbar)
        
//         let results
//         searchbar.appendChild(new Search(input => {
//             const searchOutput = searchUser(input)
//             console.log(searchOutput)

//             if (!results) {
//                 results = new ResultUser(searchOutput).container
//                 searchbar.appendChild(results)
//             } else {
//                 const _results = results

//                 results = new ResultUser(searchOutput).container

//                 _results.replaceWith(results)
//             }
//         },'Search Users🦗').container)

//         searchbar.appendChild(new Search(input => {

//             googleSearch(input, (error, searchOutput) => {
//                 if (error) throw new Error(error.message, 'error')
//                 else if (!results) {
//                     results = new ResultGoogle(searchOutput).container
        
//                     searchbar.appendChild(results)
//                 } else {
//                     const _results = results
    
//                     results = new ResultGoogle(searchOutput).container
        
//                     _results.replaceWith(results)
//                 }
//             })
//         }, 'Search Google').container)
        
//         searchbar.appendChild(new Search(input => {

//             ecosiaSearch(input, (error, searchOutput) => {
//                 if (!results) {
//                     results = new ResultGoogle(searchOutput).container
        
//                     searchbar.appendChild(results)
//                 } else {
//                     const _results = results
    
//                     results = new ResultGoogle(searchOutput).container
        
//                     _results.replaceWith(results)
//                 }
//             })
//         }, 'Search Ecosia').container)


//         holaNews((error, news) => {
//             main.appendChild(new News(news, 'Enjoy the latest news from HOLA!').container)
//         })
//     }     
// }



// function Search(buttonName, buttonFunction){
//     return <form className="search" onSubmit = {function(){buttonFunction(event)}}>
//         <input type="text" name="query"/>
//             <button>{`${buttonName}`}</button>
//         </form>
// }

// showUserSearch = (event) =>{ 
//     input = event.target.query.value
//     const searchOutput = searchUser(input)

//     console.log(searchOutput)

//     let resultsList = <ul className= "search"></ul>
//     searchOutput.map(element=> { })


//     if (!results) {
//         render(){
//             <></>
//         }
//         results = new ResultUser(searchOutput).container
//         searchbar.appendChild(results)
//     } else {
//         const _results = results

//         results = new ResultUser(searchOutput).container

//         _results.replaceWith(results)
//     }
// }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }/ }