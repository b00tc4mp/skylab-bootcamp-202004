function SportNews({ sportNews }) {



    return <>
        <section className="sport-news">
            {
                sportNews ?
                    
                        <ul className="sport-news__list">
                            {sportNews.map(({ title, link, linkImg }) =>
                                <li >
                                    <img className="sport-news__image" src={linkImg} alt="image-new" />
                                    <a href={link} target="_blank"><h2 className="sport-news__title">{title}</h2></a>
                                    <hr className="sport-news__separation" />
                                </li>
                            )}
                        </ul>
                  
                    :
                    <Feedback message="sorry, no results :(" level="warning" />
            }

        </section>
    </>
}





