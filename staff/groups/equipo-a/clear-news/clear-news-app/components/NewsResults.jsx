const { useState } = React

function NewsResults({ onSearch, results, token, query, language, sortBy }) {

    // const [count, setCount] = useState(0)

    function handleLikeNews(newsTitle) {
        try {
            storeNews(token, newsTitle, error => {
                if (error) throw error
                else {
                    searchNews(token, query, language, sortBy, count, (error, results) => {
                        if (error) throw error
                        onSearch(results, query, language, sortBy, count)
                    })
                }
            })
        } catch (error) {
            if (error) throw error
        }
    }

    // function handleMoreNews(count) {
    //     try {
    //         searchNews(token, query, language, sortBy, count, (error, results) => {
    //             if (error) throw error
    //             onSearch(results, query, language, sortBy, count)
    //         })
    //     } catch (error) {
    //         if (error) throw error
    //     }
    // }

    return <section className="search-news">

        {
            results && <ul className="news__container">
                {results.map(({ name, title, url, urlToImage, favorites }) =>
                    <li className="news__item" key={title}>
                        <a href={url} target='_blank'><img className="news__images" src={urlToImage}></img>
                            <div className="news__title stroke"><p className="stroke">{name}</p><p className="stroke"> {title}</p></div></a>
                        <div className="news__button"> <button onClick={() => handleLikeNews(title)}>{favorites ? 'unFollow' : 'follow'}</button></div>
                    </li>)}
            </ul>
        }

    </section>
}