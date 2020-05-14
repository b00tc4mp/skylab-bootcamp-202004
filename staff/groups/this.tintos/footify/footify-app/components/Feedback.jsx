function Feedback({ message, level }) {
    return <>
        <section className={`feedback-${level}`}>
            {message === 'sorry, no players found :(' ?
                <img className="feedback__img" src="img/feedback.jpeg" alt="" />
                : ''
            }
            <p>{message}</p>

        </section>

    </>
}