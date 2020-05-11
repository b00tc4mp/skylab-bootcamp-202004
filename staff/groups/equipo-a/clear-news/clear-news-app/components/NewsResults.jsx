

function NewsResults({onSearch, results, token, query, language, sortBy}){

function handleLikeNews(newsTitle){
    try{
        storeNews(token, newsTitle, error =>{
            if(error) throw error
            else{
               searchNews(token, query, language, sortBy, 0, (error, results)=>{
                if(error) throw error
                debugger
                onSearch(results, query, language, sortBy, 0)
               })
            }
        })
    }catch(error){
        if(error) throw error
    }
} 

// function UserResults({ users, token, onToggleFollow, onUserSessionExpired }) {
//     function handleToggleFollow(followingId) {
//         try {
//             toggleFollowUser(token, title, error => {
//                 if (error) {
//               
//                     else throw error
//                 } else onToggleFollow()
//             })
//         } catch (error) {
//             if (error) throw error
//         }
//     }


return <section className="search-news">

        {
            results && <ul className="news__container">
                {results.map(({ name, title, url, urlToImage,favorites }) =>
                    <li className="news__item" key={title}>
                        <a href={url} target='_blank'><img className="news__images" src={urlToImage}></img>
                            <div className="news__title stroke"><p className="stroke">{name}</p><p className="stroke"> {title}</p></div></a>
                            <div className="news__button"> <input type="image" src={favorites? "images/heart-unfollow.png" : "images/heart-follow.png"} onClick={() => handleLikeNews(title)} /></div>
                    </li>)}
            </ul>
        }

    </section>
}