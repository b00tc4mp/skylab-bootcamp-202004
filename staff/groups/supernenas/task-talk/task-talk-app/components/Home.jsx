 const {useState, Component} = React;

 class Home extends Component {
     constructor() {
        super()
        this.state = {
        menu: false,
        view: "groups",
        navigationName: "usuario",
        groups: [],
        currentgroup:undefined,
        activities:[],
        error:false,
        selectedActivity:undefined
        }
     }

    toggleMenu = ()=> { this.setState({menu: !this.state.menu})} 
    handleReturn=()=>{ 

        switch(this.state.view) {
            case "cards":
                this.setState({view: "groups", navigationName:"usuario",menu:false})
                break;
            case "cardEdition":
                this.setState({view: "cards", navigationName:"",menu:false})
                break;
        }       
    }
    handleAuthorize=()=>{authenticateuser(()=>{
        //Muestre los grupos
        retrieveusergroups("juanomen",(_groups)=>{
            this.setState({groups:_groups,navigationName:"juanomen",menu:false,view:"groups", error:false})
        },(retrieveError)=>{
            this.setState({error:retrieveError})
        })
    },(authorizeError) =>{
        this.setState({error: authorizeError.responseText})
    })}
    handleGoToGroup=(id)=>{
        retrievegroupactivity(id,(_activities)=>{
            this.setState({activities:_activities, view:"cards",navigationName:_activities[0].boardId, menu:false, error:false, currentgroup:id})
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
        },(error)=>{})
    }
//function updateactivity(id,newValues,onSuccess, onFailure)
//Trello.put("cards/"+id,{name: newValues.name,desc: newValues.desc,idList: newValues.idList},onSuccess,onFailure)
    handleReturnToCards=()=>{
        this.setState({view: "cards", navigationName: ""})
    }
    render () {
        return <section className="home">
            
            <NavigationBar view={this.state.view} navigationText={this.state.navigationName} onMenuClick={this.toggleMenu} onReturn={this.handleReturn} />
            {this.state.menu && <ContextMenu view={this.state.view} onLogout={this.props.onLogout} onCreateGroup={this.handleGoToGroup} onLinktrello={this.handleAuthorize} onCreateCard={this.handleEditCard} />}
            {this.state.error && <Feedback message={this.state.error} level={"error"} /> }
                
            {this.state.view==="groups" && <SelectGroups userGroups={this.state.groups} toSelectedGroup={this.handleGoToGroup} /> }
            {this.state.view==="cardEdition" && <CardEdition onReturn={this.handleReturnToCards} onCreate={this.handleCreateCard} onUpdate={this.handleUpdateCard}  editCard={this.state.selectedActivity} />}
            {this.state.view==="cards" && <CardSelection activities={this.state.activities} toEdit={this.handleEditCard} /> }
        </section>
    }
 }