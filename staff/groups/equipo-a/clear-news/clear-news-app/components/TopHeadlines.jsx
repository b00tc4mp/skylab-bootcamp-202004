const { useEffect, useState } = React

function TopHeadlines({pages, topHeadlines, token }) {
    const [error, setError] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const[news, setNews] = useState()

    useEffect(() => {
        let mounted = true
        !news && retrieveNews(token, (error, news, pages) => {
            if (error) setError(error.message)
            if (mounted){
            topHeadlines(pages)
            setNews(news)
            }
        })

        return () => mounted = false
    }, [])

    function handleLikeNews(headline) {
        try {
            storeTopHeadlines(token, headline, error => {
                if (error) throw error

                else {
                    retrieveNews(token, (error, news, pages) => {
                        if (error) setError(error.message)
                        topHeadlines(pages)
                        setNews(news)
                    })
                }
            })
        } catch (error) {
            if (error) throw error
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
                            <div className="news__title"><p>{name}</p><p> {title}</p></div></a>
                            <div className="news__button"> <input type="image" className="news__followIMG" src={favorites? "images/heart-follow.png" : "images/heart-unfollow.png"} onClick={() => handleLikeNews({name, title, url, urlToImage})} /></div>

                    </li>)}
                
            </ul>
            
        }
        {pages && <Pages pages={pages} handleCurrentPage={handleCurrentPage}/>}

    </section>
}