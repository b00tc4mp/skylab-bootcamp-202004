function ContextMenu({view, onLogout, onLinktrello, onCreateGroup, onInviteToGroup, onLeaveGroup, onCreateCard}){
    return  <div className="context__menu">
        {
        view==="groups" && <>
                <a className="button__context" onClick={onLinktrello} >Link Trello</a>
                <a className="button__context"  >Create Group</a>
                <a className="button__context"  onClick={onLogout}>Logout</a>
                </>
        }
        {view==="cards" && <>
                <a className="button__context" onClick={onCreateCard} >Create new card</a>
                <a className="button__context" href="#">Invite to group</a>
                <a className="button__context" href="#">Leave group</a>
                </>
        }           
    </div>
}