class Navigation extends Component{
    constructor(props){
        super()
        this.state={view:"profile", 
                    user:props.user,
                    token: props.token,
                    usersResults: undefined,
                    usersQuery: undefined,
                    followingResults: undefined,
                    formTweet: "",
                    userTweets: undefined,
                    feedTweets: undefined,
                    followersResults: undefined,
                    newsResults: undefined
                    };
    }
    
    handleProfile=event=>{
        retrieveUserTweets(this.state.token,(error,tweets)=>{
            if(error===undefined){
                this.setState({view:"profile", userTweets:sortTweets(tweets)});
            }
        })
    }
    handleDiscover=event=>{
        searchUser(this.state.token,this.state.user.username,(error,users)=>{
            if(error===undefined){
            this.handleSearchUsers(users,"");
            this.setState({view:"discover"});
        }
        })
    }
    handleDiscoverOnSearch=query=>{
        searchUser(this.state.token,query,(error,users)=>{
            if(error===undefined){
                this.handleSearchUsers(users,query);
            }
        })
    }
    handleFeed=event=>{
        retrieveFollowingTweets(this.state.token,(error,allTweets,tweetUsers,tweetsAndUsers)=>{
            if(error===undefined){
                tweetsAndUsers.sort((a,b)=>b.tweet.date-a.tweet.date)
                this.setState({view:"feed", feedTweets:tweetsAndUsers})
            }
        })
    }
    handleFollowing=event=>{
        searchFollowing(this.state.token,(error,users)=>{
            if(error===undefined){
                this.setState({view:"following",followingResults: users})
            }
        })
    }
    handleFollowers=event=>{
        retrieveFollowers(this.state.token,(error,results)=>{
            if(error===undefined){
                this.setState({view:"followers",followersResults: results});
            }
        })
    }
    handleLikes=event=>this.setState({view:"likes"})
    handleLogOut=event=>this.props.onLogOut()
    handleNews=event=>{
        dnavarra((error,news)=>{
            if(error===undefined){
                this.setState({view:"news", newsResults:news})
            }
        })
    }
    handleDelete=event=>{
        //Borrar la cuenta
    }

    handleSearchUsers=(results,query)=>{
        this.setState({usersResults: results, usersQuery: query});
    }
    handleOnFollow=(id)=>{
        toogleFollow(this.state.token,id,(error)=>{
            if(error===undefined){
                this.handleDiscoverOnSearch(this.state.usersQuery);
                this.setState({view:"discover"});
            }
        });
    }
    handleChangeTweet=(event)=>{
        this.setState({formTweet:event.target.value})
    }
    handleOnSendTweet=(event)=>{
        //Funciona a medias
        event.preventDefault();
        makeTweet(this.state.token,this.state.formTweet,(error)=>{
            if(error===undefined){
                this.setState({formTweet:""});
                this.render();
            }
        })
    }
    render(){
        return<section className="user__view"> 
        <section className="navigation">
                <h1 className="navigation__title">{this.state.user.name}</h1>
                
                <input className="peter__input" value={this.state.formTweet} onChange={this.handleChangeTweet} placeholder="What's in your mind?" required/>
                <button className="peter__button" onClick={this.handleOnSendTweet} >SHARE 🦗</button><br/>
                <button className="navigation__button" onClick={this.handleProfile}>MY PROFILE</button><br/>
                <button className="navigation__button" onClick={this.handleDiscover}>DISCOVER</button><br/>
                <button className="navigation__button" onClick={this.handleFeed}>FEED</button><br/>
                <button className="navigation__button" onClick={this.handleFollowing}>FOLLOWING</button><br/>
                <button className="navigation__button" onClick={this.handleFollowers}>FOLLOWERS</button><br/>
                <button className="navigation__button" onClick={this.handleLikes}>LIKES</button><br/>
                <button className="navigation__button" onClick={this.handleNews}>NEWS</button><br/>
                <button className="navigation__button" onClick={this.handleLogOut}>LOG OUT</button><br/>
                <button className="navigation__button" onClick={this.handleDelete}>DELETE ACCOUNT</button><br/>
            </section>
            {this.state.view && <Results view={this.state.view} discoverResults={this.state.usersResults} onSearch={this.handleDiscoverOnSearch}
            onFollow={this.handleOnFollow} followingResults={this.state.followingResults} userTweets={this.state.userTweets} user={this.state.user} 
            feedTweets={this.state.feedTweets} followersResults={this.state.followersResults} newsResults={this.state.newsResults}/>}
            </section>
    }
}