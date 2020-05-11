const { useEffect, useState } = React

function TopHeadlines({ news, myHeadlines, token }) {
    const [error, setError] = useState()
    // const [NewsError, setErrorNews] = useState()

    useEffect(() => {
        !news && retrieveNews(token, (error, news) => {
            if (error) setError(error.message)
            myHeadlines(news)
        })
    }, [])
  
    function handleLikeNews(newsTitle) {
        try {
            storeNews(token, newsTitle, error => {
                if (error) throw error
                // setErrorNews(error.message)
                /* if(error.message==="invalid token") */
                else {
                    retrieveNews(token, (error, news) => {
                        if (error) setError(error.message)
                        myHeadlines(news)
                    })
                }
            })
        } catch (error) {
            if (error) throw error
            // setErrorNews(error.message)
        }
    }
    return <section className="news">

        {
           
            news && <ul className="news__container"> 
                {news.map(({ name, title, url, urlToImage,favorites }) =>
                    <li className="news__item" key={title}>
                        <a href={url} target='_blank'><img className="news__images" src={urlToImage}></img>
                            <div className="news__title stroke"><p className="stroke">{name}</p><p className="stroke"> {title}</p></div></a>
                            <div className="news__button"> <input type="image" className="news__followIMG" src={favorites? "images/heart-follow.png" : "images/heart-unfollow.png"} onClick={() => handleLikeNews(title)} /></div>
                    </li>)}
                
            </ul>
            
        }

    </section>
}