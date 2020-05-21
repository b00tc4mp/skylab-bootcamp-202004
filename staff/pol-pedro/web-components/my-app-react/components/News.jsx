const {useState, useEffect} = React


function News ({onNews, results, }){
     useEffect(() => {
        news20 ((found) => { 
            onNews(found)
        }) 
    }, [])

        return <section class="news-grid">
            {results && results.map(({textTitle, link}) => <div><a href={`${link}`} target="blank"><h1>{textTitle}</h1></a></div>)}
        </section>
}