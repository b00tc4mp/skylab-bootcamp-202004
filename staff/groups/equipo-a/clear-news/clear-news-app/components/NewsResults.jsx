const { useState } = React

function NewsResults({ onSearch, results, token, query, language, sortBy, pages }) {

    const [currentPage, setCurrentPage] = useState(1)

    function handleLikeNews(newsTitle) {
        try {
            storeNews(token, newsTitle, error => {
                if (error) throw error
                else {

                    searchNews(token, query, language, sortBy, (error, results, pages) => {
                        if (error) throw error
                        onSearch(results, query, language, sortBy, pages)
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

    return <section className="search-news">

        {
            results.length ? <ul className="news__container">
                {newsForPage(results, currentPage).map(({ name, title, url, urlToImage, favorites }) =>
                    <li className="news__item" key={title}>
                        <a href={url} target='_blank'><img className="news__images" src={urlToImage} alt="Image not available for your region"></img>
                            <div className="news__title"><p>{name}</p><p> {title}</p></div></a>

                            <div className="news__button"> <input type="image" className="news__followIMG" src={favorites? "images/heart-follow.png" : "images/heart-unfollow.png"} onClick={() => handleLikeNews(title)} /></div>



                    </li>)}
            </ul>
             : <Feedback message="sorry, no results" level="warning" />
        }
        {pages && <Pages pages={pages} handleCurrentPage={handleCurrentPage}/>}

    </section>
}