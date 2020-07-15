function NavigationBar({view, navigationText, onMenuClick, onReturn}){

    
    return <div className="navigation__bar navigation__bar--upper">
                 
                <button className=" button__card button__card--regular button__card--back" onClick={onReturn}>◄</button>
                <div className="navigation__text ">{navigationText}</div>           
                {view!=="cardEdition" &&
                <button className="button__card button__card--inverted button__card--configuration" onClick={onMenuClick}>☰</button>
                }
            </div>
}