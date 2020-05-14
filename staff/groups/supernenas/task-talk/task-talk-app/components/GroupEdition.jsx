const {useState} = React

function GroupEdition({editGroup, onCreate, onUpdate, onDelete}) {
    const [groupTitle, setGroupTitle] = useState("")
    const [groupDesc, setGroupDesc] = useState("")

    const handleChangeTitle = (event) => setGroupTitle(event.target.value)

    const handleChangeDesc = (event) => setGroupDesc(event.target.value)

    const handleSubmit = (event) => {
        event.preventDefault()

        !!editGroup ? onUpdate(groupTitle, groupDesc, editGroup) : onCreate(groupTitle, groupDesc) 
    }
/*
    const handleDelete = () => {
        if(editGroup) onDelete(editGroup)
    }
    */

    return  <form className="card card__editing">
                <div className="card__title">
                    <div className="card__grid">
                        <button type="submit" className="button__card button__card--regular button__card--save" onClick={handleSubmit} >✔</button>
                        <input type="text" required className="card__input card__input--title" placeholder="What we need to do " onChange={handleChangeTitle}  value={groupTitle} />
                        <button className="button__card button__card--inverted button__card--delete" onClick={onDelete}>✖</button>
                    </div>
                </div>
                <div className="card__message">
                    <textarea className="card__input card__input--text" rows="4" placeholder="Click here to add a description" onChange={handleChangeDesc} value={groupDesc}> </textarea>
                </div>
            </form>
}