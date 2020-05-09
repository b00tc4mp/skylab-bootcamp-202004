const { useEffect, useState } = React

function TopHeadlines({ news, myHeadlines, token }) {
    const [error, setError] = useState()

    useEffect(() => {
        !news && retrieveNews(token, (error, news) => {
            if (error) setError(error.message)
            myHeadlines(news)
        })
    }, [])

    return <section className="news">
        {
            news && <ul className="news__container">
                { news.map(({ name, title, url, urlToImage }) =>
                        <li className="news__item" key={title}>
                            <a href={url} target='_blank'><img className="home__images" src={urlToImage}></img>
                            <div className="news__title stroke"><p className="stroke">{name}</p><p className="stroke"> {title}</p> </div></a>
                </li>)}
            </ul>
        }

    </section>
}