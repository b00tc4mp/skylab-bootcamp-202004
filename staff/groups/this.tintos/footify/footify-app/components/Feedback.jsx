function Feedback({ message, level }) {
    return <>
        <section className="feedback">
            {message === 'sorry, no players found :(' ?
                <img className="feedback__img" src="img/feedback.jpeg" alt="" />
                : ''
            }
            <p className={`feedback--${level}`}>{message}</p>

        </section>

    </>
}