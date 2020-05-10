const { useState, useEffect } = React

function Favorites({token,onGoToProfile,onGoToTopheadlines,onGoToSearch}) {
    
    useEffect(() => {
        !news && retrieveFavoritesNews(token, ( error,favNews) => {
            if (error) setError(error.message);
            myFavorite(favNews);
        })
    }, []);

 
    function handleGoToProfile(event) {
        event.preventDefault();

        onGoToProfile();
    }

    function handleGoToTopheadlines(event) {
        event.preventDefault();

        onGoToTopheadlines();
    }

    function handleGoToSearch(event) {
        event.preventDefault();

        onGoToSearch();
    }

    return <><section className="navBar">
            <a href="" onClick={handleGoToProfile}>Profile </a>
            <a href="" onClick={handleGoToTopheadlines}>Top Headlines </a>
            <a href="" onClick={handleGoToSearch}>Search </a>
         </section>

    <section className="favNews">

        {
            favNews && <ul className="news__container">
                { favNews.map(({ name, title, url, urlToImage }) =>
                        <li className="news__item" key={title}>
                            <a href={url} target='_blank'><img className="news__images" src={urlToImage}></img>
                            <div className="news__title stroke"><p className="stroke">{name}</p><p className="stroke"> {title}</p> </div></a>
                </li>)}
            </ul>
        }

    </section>

    </>   
}

//retrieveFavoritesNews