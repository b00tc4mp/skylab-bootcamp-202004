function Tweets({ listTweet }) {

    return <section className="tweets">
        {listTweet.length ?
        <ul>{listTweet.map(({ name, text, date }) => {
            return <li key={text-date-name}>
                <div className="tweet">
                    <h2>{`${text}`}</h2>
                    <p>{`${name}`}</p>
                    {date ? <p>{`${date.slice(0, 24)}`}</p> :<p>{`no date`}</p> }
                </div>
            </li>
        })}</ul>
        : <Feedback message="you don't have tweets yet :´(" level="warning"/>}
    </section>
}




