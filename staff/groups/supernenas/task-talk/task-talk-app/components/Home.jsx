 const {useState, Component} = React;

 class Home extends Component {
     constructor(props) {
        super()
        
        this.state = {
        menu: false,
        view: "groups",
        navigationName: "usuario",
        groups: [],
        currentgroup:undefined,
        currentuser:undefined,
        activities:[],
        error:false,
        selectedActivity:undefined
        }
        // debemos refactorizar es largo es te codigo :DD ya esta zoom disponible
     }
     componentDidMount(){
        if(localStorage.trello_token){
            Trello.setToken(localStorage.trello_token)
            getcurrentuser((user)=>{
                this.setState({currentuser:user,navigationName:user.fullName})
                this.handleShowGroups();
            },(error)=>{
                this.setState({error: error.responseText})
            })
        } 
        else{
            retrievetrellofromskylab(this.props.tokenskylab,(error, result)=>{
                if(error){ 
                    this.setState({error: error.responseText})
                }else if(result){
                    Trello.setToken(result)
                    getcurrentuser((user)=>{
                        this.setState({currentuser:user,navigationName:user.fullName})
                        this.handleShowGroups();
                    },(error)=>{
                        this.setState({error: error.responseText})
                    }) 
                }
            })
        }
     }
    toggleMenu = ()=> { this.setState({menu: !this.state.menu})} 
    handleReturn=()=>{ 

        switch(this.state.view) {
            case "cards":
                this.handleShowGroups();
                break;
            case "cardEdition":
                this.setState({view: "cards", navigationName: this.state.groups[this.state.groups.findIndex((group) => {return group.id===this.state.currentgroup})].name , menu:false})
                break;
        }       
    }
    handleAuthorize=()=>{authenticateuser(()=>{
        getcurrentuser((user)=>{
            linkskylabtrello((error)=>{
                if(error){
                    this.setState({error: error.responseText})
                }else{
                    this.setState({currentuser:user,navigationName:user.fullName})
                this.handleShowGroups();
                }
            },sessionStorage.token,Trello.token())
        },(error)=>{
            this.setState({error: error.responseText})
        })
    },(authorizeError) =>{
        this.setState({error: authorizeError.responseText})
    })}
    handleGoToGroup=(id)=>{
        retrievegroupactivity(id,(_activities)=>{
            this.setState({activities:_activities, view:"cards", menu:false, error:false, currentgroup:id})
            this.setState({navigationName: this.state.groups[this.state.groups.findIndex((group) => {return group.id===this.state.currentgroup})].name}) 
        },(retrieveError)=>{
            this.setState({error: retrieveError.responseText})
        })
    }
    handleCreateCard=(title, desc)=>{//TODO esto no va así
        Trello.get(`boards/${this.state.currentgroup}/lists`,(lists)=>{
            createnewactivity(title,desc,lists[0].id,()=>{
                this.handleGoToGroup(this.state.currentgroup);
            },()=>{})
        })
    }

    handleEditCard=(cardId)=>{
        (cardId) ? this.setState( 
            {view: "cardEdition", 
            menu: false, 
            navigationName:"Add a new card", 
            selectedActivity:this.state.activities.find((activity)=>{  return activity.id===cardId})}):
        this.setState({view: "cardEdition", menu: false, navigationName:"Add a new card", selectedActivity: undefined})
    }
    handleUpdateCard=(cardId,listId,title, message)=>{
        updateactivity(cardId,{name: title, desc:message, idList: listId},()=>{
            this.handleGoToGroup(this.state.currentgroup);
            this.setState({navigationName: this.state.groups[this.state.groups.findIndex((group) => {return group.id===this.state.currentgroup})].name})
        },(error)=>{
            this.setState({error: error.responseText})
        })
    }
    handleDeleteCard=(cardId)=>{
        deleteactivity(cardId,()=>{
            this.handleGoToGroup(this.state.currentgroup)
        },(error)=>{
            this.setState({error: error.responseText})
        })
    }
  
    handleReturnToCards=()=>{
        this.setState({view: "cards", navigationName: this.state.groups[this.state.groups.findIndex((group) => {return group.id===this.state.currentgroup})].name}) 
    }
    handleCreateGroup=(groupTitle, groupDesc)=>{
        createnewgroup(groupTitle,groupDesc,(newGroup)=>{
            createnewlist("TODO",newGroup.id,()=>{
                this.handleShowGroups()
            },()=>{
                this.setState({error: error.responseText})
            })
        },(error)=>{
            this.setState({error: error.responseText})
        })
    }
    handleUpdateGroup=(groupName, groupDesc, group)=>{
        console.log(group)

    }
    handleDeleteGroup=()=>{
        deletegroup(this.state.currentgroup,()=>{
            this.handleShowGroups();
        },(error)=>{
            this.setState({error: error.responseText})
        })
    }
    handleEditGroup=(groupid)=>{
        groupid ? this.setState({
            view:"groupEdition",
            menu: false, 
            navigationName:"Add a new group",
            currentgroup: this.state.groups.find((groups) => { return groups.id===groupid})
            //selectedActivity:this.state.activities.find((activity)=>{  return activity.id===cardId})})
            //Para editar
        }):
        this.setState({view:"groupEdition",menu:false,navigationName:"Create new group",currentgroup:undefined})
    }
    handleShowGroups=()=>{
        retrieveusergroups(this.state.currentuser.id,(_groups)=>{
            
            this.setState({groups:_groups,navigationName:this.state.currentuser.fullName ,menu:false,view:"groups", error:false})
        },(error)=>{
            this.setState({error: error.responseText})
        })
    }
    handleInviteUser=(username)=>{
        Trello.get("members/"+username,(user)=>{//TODO usar logica
            invitetogroup(user.id,this.state.currentgroup,()=>{
                this.handleReturnToCards();
            },(error)=>{
                this.setState({error: error.responseText})
            })
        },(error)=>{
            this.setState({error: error.responseText})
        })
    }
    handleToInvite=()=>{
        this.setState({view:"invitation"})
    }
    handleLeaveGroup=()=>{
        getcurrentuser((user)=>{
            leavegroup(user.id,this.state.currentgroup,()=>{
                this.handleShowGroups();
            },(error)=>{
                this.setState({error: error.responseText})
            })
        },(error)=>{
            this.setState({error: error.responseText})
        })
    }
    render () {
        return <section className="home">
            
            <NavigationBar view={this.state.view} navigationText={this.state.navigationName} onMenuClick={this.toggleMenu} onReturn={this.handleReturn} />
            {this.state.menu && <ContextMenu view={this.state.view} onLogout={this.props.onLogout} onCreateGroup={this.handleEditGroup} onLinktrello={this.handleAuthorize} onCreateCard={this.handleEditCard} onDeleteGroup={this.handleDeleteGroup} onInviteToGroup={this.handleToInvite} onLeaveGroup={this.handleLeaveGroup}/>}
            {this.state.error && <Feedback message={this.state.error} level={"error"} /> }
                
            {this.state.view==="groupEdition"&& <GroupEdition  onCreate={this.handleCreateGroup}  onUpdate={this.handleUpdateGroup} /> }
            {this.state.view==="groups" && <SelectGroups userGroups={this.state.groups} toSelectedGroup={this.handleGoToGroup} /> }
            {this.state.view==="cardEdition" && <CardEdition onReturn={this.handleReturnToCards} onCreate={this.handleCreateCard} onUpdate={this.handleUpdateCard}  editCard={this.state.selectedActivity} onDelete={this.handleDeleteCard} />}
            {this.state.view==="cards" && <CardSelection activities={this.state.activities} toEdit={this.handleEditCard} /> }
            {this.state.view==="invitation" && <GroupInvitation onSend={this.handleInviteUser} />}
        </section>
    }
 }