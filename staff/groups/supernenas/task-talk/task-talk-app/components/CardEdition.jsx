const {useState}=React
function CardEdition({onSubmit, onDelete}) {

    const [cardTitle, setCardTitle] = useState("")
    const [cardMessage, setCardMessage] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(cardTitle, cardMessage)
    }   

    const handleChangeTitle = (event) => {
        setCardTitle(event.target.value)
    }

    const handleChangeMessage = (event) => {
        setCardMessage(event.target.value)
    }


    return  <form className="card card__editing">
                <div className="card__title">
                    <div className="card__grid">
                        {/* <button className=" button__card button__card--regular button__card--back " onClick={onReturn} >◄</button> */}
                        <button type="submit" className="button__card button__card--regular button__card--save" onClick={handleSubmit} >✔</button>
                        <input type="text" required className="card__input card__input--title" placeholder="What we need to do " onChange={handleChangeTitle} />
                        <button className="button__card button__card--inverted button__card--delete" onClick={onDelete}>✖</button>
                    </div>
                </div>
                <div className="card__message">
                    <textarea className="card__input card__input--text" rows="4" placeholder="Click here to add a description" onChange={handleChangeMessage}></textarea>
                </div>
            </form>
}
