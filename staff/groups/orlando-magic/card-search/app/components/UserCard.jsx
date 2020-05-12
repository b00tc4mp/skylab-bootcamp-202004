function UserCard({user}) {
    const {nickname, email, myCards} = user
    return <>
        <div className='user-card-container'>
            <section className="menu-title">
                <h1 className='name title'>{nickname}</h1>
                <div className="frame-art-container">
                    <img className='frame-art' src='https://i.blogs.es/eadad8/chandra/450_1000.jpg' alt='jace art'/>
                </div>
                <h1 className="type title">{email}</h1>
                <div className="form-container">
                    <form className='form' >
                        <h2>{nickname} has <a href="">{myCards?myCards.length:0}</a> favourite cards.</h2>
                    </form>
                    <div className="nav">
                        <a className="nav__item" href=""><h1>Follow</h1></a>
                    </div>
                </div>
            </section>
        </div>
    </>
}