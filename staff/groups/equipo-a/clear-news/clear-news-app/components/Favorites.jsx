const { useState, useEffect } = React

function Favorites({token, myFavorite, favNews}) {
    const [error, setError] = useState()

    useEffect(() => {
        !favNews && retrieveFavNews(token, ( error,favNews) => {
            if (error) setError(error.message);
            myFavorite(favNews);
        })
    }, []);

    function handleLikeNews(newsTitle) {
        try {
            storeNews(token, newsTitle, error => {
                if (error) throw error
                // setErrorNews(error.message)
                /* if(error.message==="invalid token") */
                else {
                    retrieveFavNews(token, (error, news) => {
                        if (error) setError(error.message)
                        myFavorite(news)
                    })
                }
            })

        } catch (error) {
            if (error) throw error
            // setErrorNews(error.message)
        }
    }

    return <>
    
    <section className="favNews">
        {
            favNews && <ul className="news__container">
                { favNews.map(({ name, title, url, urlToImage }) =>
                        <li className="news__item" key={title}>
                            <a href={url} target='_blank'><img className="news__images" src={urlToImage}></img>
                            <div className="news__title stroke"><p className="stroke">{name}</p><p className="stroke"> {title}</p> </div></a>
                            <div className="news__button"> <button onClick={() => handleLikeNews(title)}>{favorites? 'unFollow' : 'follow'}</button></div>
                </li>)}
            </ul>
        }
    </section>
    </>   
}

