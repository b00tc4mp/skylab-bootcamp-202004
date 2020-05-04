function Tweets({ listTweet }) {

    return <section className="tweets">
        <ul>{listTweet.map(({ name, message, date }) => {
            return <>
                <h2>{`${message}`}</h2>
                <p>{`${name}`}</p>
                <p>{`${date.slice(0,24)}`}</p>
            </>
        })}</ul>
    </section>
}




