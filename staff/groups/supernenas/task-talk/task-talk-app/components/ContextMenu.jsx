function ContextMenu({view, onLogout, onLinktrello, onCreateGroup, onInviteToGroup, onLeaveGroup, onCreateCard,onDeleteGroup}){
    return  <div className="context__menu">
        {
        view==="groups" && <>
                <a className="button__context" onClick={onLinktrello} >Link Trello</a>
                <a className="button__context"  onClick={onCreateGroup}>Create Group</a>
                <a className="button__context"  onClick={onLogout}>Logout</a>
                </>
        }
        {view==="cards" && <>
                <a className="button__context" onClick={onCreateCard} >Create new card</a>
                <a className="button__context" onClick={onInviteToGroup}>Invite to group</a>
                <a className="button__context" onClick={onLeaveGroup}>Leave group</a>
                <a className="button__context" onClick={onDeleteGroup}>DeleteGroup</a>
                </>
        }           
    </div>
}