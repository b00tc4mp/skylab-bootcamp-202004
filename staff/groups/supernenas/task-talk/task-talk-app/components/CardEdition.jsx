const {useState}=React
function CardEdition({onCreate,onUpdate, onDelete, editCard}) {

    const [cardTitle, setCardTitle] = useState(editCard ? editCard.name : "")
    const [cardMessage, setCardMessage] = useState(editCard ? editCard.desc : "")

    const handleSubmit = (event) => {
        event.preventDefault();
        editCard?onUpdate(editCard.id, editCard.idList,cardTitle,cardMessage):
        onCreate(cardTitle, cardMessage)
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
                        <input type="text" required className="card__input card__input--title" placeholder="What we need to do " onChange={handleChangeTitle}  value={cardTitle} />
                        <button className="button__card button__card--inverted button__card--delete" onClick={onDelete}>✖</button>
                    </div>
                </div>
                <div className="card__message">
                    <textarea className="card__input card__input--text" rows="4" placeholder="Click here to add a description" onChange={handleChangeMessage} value={cardMessage}> </textarea>
                </div>
            </form>
}
