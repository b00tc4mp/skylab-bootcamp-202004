function UserCard({user, handleFollow, goToUser}) {
    const {nickname, email, myCards, following} = user

    return<>
        <div className='user-card-container'>
            <section className="card-container__section">
                <h1 className='card-container__name card-container__title'>{nickname}</h1>
                <div className="card-container__frame-art-container">
                    <img className='card-container__frame-art' src='https://i.blogs.es/eadad8/chandra/450_1000.jpg' alt='jace art'/>
                </div>
                <h1 className="card-container__type card-container__title">{email}</h1>
                <div className="card-container__nav">
                    {typeof user.following !== "undefined" && 
                    <a className="card-container__nav-item" href="" onClick = {()=>{event.preventDefault(); handleFollow(user)}}>
                        <h1>{user.following === true?"Unfollow":"Follow"}</h1></a>}                    
                    <a className="card-container__nav-item" href="" onClick = {()=>{event.preventDefault(); goToUser(user)}}><h1>View Profile</h1></a>
                </div>
            </section>  
        </div>     
    </>
}