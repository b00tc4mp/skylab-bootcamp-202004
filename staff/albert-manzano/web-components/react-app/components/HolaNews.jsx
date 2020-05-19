const { useState, useEffect } = React

function HolaNews({ onNews, news }) {
    useEffect(() => {
        try {
            !news && retrieveHolaNews((error, news) => {
                if (error) throw error

                onNews(news)
            })
        } catch (error) {
            throw error
        }
    }, [])


    return <section className="hola-news">
        <h2>Hola News</h2>

        {news && <ul>
            {news.map(({ image, link, text }) =>
                <li>
                    <a href={link} target="_blank">
                        <img src={image} />
                        <p>{text}</p>
                    </a>
                </li>
            )}
        </ul>}
    </section>

}