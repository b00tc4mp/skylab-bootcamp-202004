function Tweets({ listTweet }) {

    return <section className="tweets">
        <ul>{listTweet.map(({ name, text, date }) => {
            return <>
                <div className="tweet">
                    <h2>{`${text}`}</h2>
                    <p>{`${name}`}</p>
                    {date ? <p>{`${date.slice(0, 24)}`}</p> :<p>{`no date`}</p> }
                </div>
            </>
        })}</ul>
    </section>
}



