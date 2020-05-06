const { useEffect } = React

function HolaNews({ news, onNews }) {
    useEffect(() => {
        !news && retrieveHolaNews((error, news) => {
            if (error) throw error

            onNews(news)
        })
    }, [])
    
    return <section className="hola-news">
        <h2>Hola News</h2>

        {news && <ul>
            {news.map(({ image, link, text }) => 
                <li key={link}>
                    <a href={link} target="_blank">
                        <img src={image} />
                        <p>{text}</p>
                    </a>
                </li>
            )}
        </ul>}
    </section>
}