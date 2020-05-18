function ResultsNews ({results}){
    return <section className='news'>
        {
            results && <ul>
                {results.map(({ image, link, title }) => 
                    <div className='news__container'>
                        <img className='news__img'src={image} />
                        <a className='news__ancor'href={link} target="_blank">
                            {title}
                        </a>
                    </div>
                )}
            </ul>}
        }
    </section>
}