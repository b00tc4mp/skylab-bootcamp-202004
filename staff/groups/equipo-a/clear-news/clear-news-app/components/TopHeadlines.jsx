const { useEffect, useState } = React

function TopHeadlines({ news, pages, myHeadlines, token }) {
    const [error, setError] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    // const [NewsError, setErrorNews] = useState()

    useEffect(() => {
        !news && retrieveNews(token, (error, news, pages) => { //si no hay noticias cuando pinte el compo
            if (error) setError(error.message)
            myHeadlines(news, pages)
        })
    }, [])

    function handleLikeNews(newsTitle) {
        try {
            storeNews(token, newsTitle, error => {
                if (error) throw error
                // setErrorNews(error.message)
                /* if(error.message==="invalid token") */
                else {
                    retrieveNews(token, (error, news, pages) => {
                        if (error) setError(error.message)
                        myHeadlines(news, pages)
                    })
                }
            })
        } catch (error) {
            if (error) throw error
            // setErrorNews(error.message)
        }
    }

    function handleCurrentPage (currentPage){
        setCurrentPage(Number(currentPage))
    }


    return <section className="news">

        {
          
            news && <ul className="news__container"> 
                {newsForPage(news, currentPage).map(({ name, title, url, urlToImage,favorites }) =>
                    <li className="news__item" key={title}>
                        <a href={url} target='_blank'><img className="news__images" src={urlToImage} alt="
                                Image not available for your region"></img>
                            <div className="news__title stroke"><p className="stroke">{name}</p><p className="stroke"> {title}</p></div></a>
                            <div className="news__button"> <input type="image" className="news__followIMG" src={favorites? "images/heart-follow.png" : "images/heart-unfollow.png"} onClick={() => handleLikeNews(title)} /></div>

                    </li>)}
                
            </ul>
            
        }
        {pages && <Pages pages={pages} handleCurrentPage={handleCurrentPage}/>}

    </section>
}