function TweetResults({ data }) {

    return <section >
        <ul>
            {(() => {
                if (data.length)
                    return (
                        <ul>
                            {data.map(({ name, surname, tweet }) => (
                                <li className="tweet">
                                    <h3>{`${name} ${surname}`}</h3>
                                    <p>
                                        {`${tweet}`}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    );
                else return <Feedback message="Sorry, no Tweets... " level="warning" />;
            })()}

        </ul>
    </section>
}