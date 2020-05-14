const {useState} = React

function GroupInvitation ({onSend}) {
    const [userInvited, setUserInvited] = useState("")

    const handleOnSend = (event) => { event.preventDefault(); onSend(userInvited) }

    const handleSetUserInvited = (event) => setUserInvited(event.target.value)

    return  <form className="card card__editing">
        <div className="card__title">
            <div className="card__grid">
                <button type="submit" className="button__card button__card--regular button__card--save" onClick={handleOnSend} >✔</button>
                <input type="text" required className="card__input card__input--title" placeholder="What we need to do " onChange={handleSetUserInvited}  value={userInvited} />
            </div>
        </div>
    </form>
}