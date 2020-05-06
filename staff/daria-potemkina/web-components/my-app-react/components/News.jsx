const { useState, useEffect } = React

function News({news, onNews}) {

  useEffect(() =>{
    !news && dailyNews((news) => {
       onNews(news)
    })
  }, [])

    return <section className="news">
      <h2>The New York Times</h2>
      {news && <ul>
        {
          news.map(({ title, content, link, image }) =>
            <li key={link}>
              <img src={image} />
              <a href={link} target='_blank'>{title}</a>
              <p>{content}</p>
            </li>)}
      </ul>
      }
    </section>
}