const { useState, useEffect } = React

function Favorites({token, myFavorite, myHeadlines}) {
    const [error, setError] = useState()
    const [favNews, setFavNews] = useState()
    const [headlines, setHeadlines] = useState()


    useEffect(() => {
        !favNews && retrieveFavNews(token, (error, favNews) => {
            if (error) setError(error.message);
            setFavNews(favNews);
        })

        !headlines && retrieveFavoriteTopHeadlines(token, (error, headlines) =>{
            if (error) setError(error.message)
            setHeadlines(headlines)
        })
    }, []);


    function handleLikeNews(newsTitle) {
        try {
            storeNews(token, newsTitle, error => {
                if (error) throw error
                // setErrorNews(error.message)
                /* if(error.message==="invalid token") */
                else {
                    retrieveFavNews(token, (error, favNews) => {
                        if (error) setError(error.message)
                        setFavNews(favNews);
                    })
                }
            })

        } catch (error) {
            if (error) throw error
            // setErrorNews(error.message)
        }
    }

    function handleLikeHeadlines(headline){
        try{
            storeTopHeadlines(token, headline, error =>{
                if (error) throw error
                else{
                    retrieveFavoriteTopHeadlines(token, (error, headlines) =>{
                        if(error) setError(error.message)
                        setHeadlines(headlines)
                    })
                }
            })

        }catch(error){
            if(error) throw error
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
                            <div className="news__button"> <input type="image" className="news__followIMG" src="images/heart-follow.png" onClick={() => handleLikeNews(title)} /></div>
                </li>)}
            </ul>
        }
        {
            headlines && <ul className="news__container">
                { headlines.map(({ name, title, url, urlToImage }) =>
                        <li className="news__item" key={title}>
                            <a href={url} target='_blank'><img className="news__images" src={urlToImage}></img>
                            <div className="news__title stroke"><p className="stroke">{name}</p><p className="stroke"> {title}</p> </div></a>
                            <div className="news__button"> <input type="image" className="news__followIMG" src="images/heart-follow.png" onClick={() => handleLikeHeadlines({name, title, url, urlToImage})} /></div>
                </li>)}
            </ul>
        }
        }
    </section>
    </>   
}

