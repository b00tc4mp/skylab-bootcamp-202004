const { useState, useEffect } = React

function Favorites({token}) {
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
                
                else {
                    retrieveFavNews(token, (error, favNews) => {
                        if (error) setError(error.message)
                        setFavNews(favNews);
                    })
                }
            })

        } catch (error) {
            if (error) throw error
            
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
    
    <section className="favNews"> <h1 className="news__fav">Favorite News</h1>
        {
            favNews ? <ul className="news__container">
                { favNews.map(({ name, title, url, urlToImage }) =>
                        <li className="news__item" key={title}>
                            <a href={url} target='_blank'><img className="news__images" src={urlToImage}></img>
                            <div className="news__title"><p>{name}</p><p> {title}</p> </div></a>
                            <div className="news__button"> <input type="image" className="news__followIMG" src="images/heart-follow.png" onClick={() => handleLikeNews(title)} /></div>
                </li>)}
            </ul> : <Feedback message="No favorite news added yet" />
        }
        <h1 className="news__fav">Favorite Headlines</h1>

        {
            headlines ? <ul className="news__container"> 
                { headlines.map(({ name, title, url, urlToImage }) =>
                        <li className="news__item" key={title}>
                            <a href={url} target='_blank'><img className="news__images" src={urlToImage}></img>
                            <div className="news__title"><p>{name}</p><p> {title}</p> </div></a>
                            <div className="news__button"> <input type="image" className="news__followIMG" src="images/heart-follow.png" onClick={() => handleLikeHeadlines({name, title, url, urlToImage})} /></div>
                </li>)}
            </ul> : <Feedback message="No favorite headlines added yet" />
        }
        
    </section>
    
    </>   
}

