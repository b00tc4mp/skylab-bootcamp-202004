function CardPreview({id,title,message,toEdit}) {
    function handleToEdit(event) {
        event.preventDefault()

        toEdit(id)
    }

    return <section className="card card__preview" onClick={handleToEdit}>
        <div className="card__title">{title}</div>
        <div className="card__message">{message}</div>
    </section>
}