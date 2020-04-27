class HomeNews extends Component{ 
    constructor(results){
    super(`<section class="news">
        <h2>Mediavida News<h2>
</section>`)

 

printNews( (results) => {

    const homeNews = document.createElement('section')

 results.forEach(function({title,link, content, image}) {debugger
     const itemTitle = document.createElement('h3')
     const itemContent = document.createElement('p')
     const itemImage = document.createElement('img')
     const itemLink = document.createElement('a')

    itemLink.innerHTML= `${link}`
    itemTitle.innerHTML = `<a id="titlelink" href="https://www.mediavida.com${link.slice(10)}">${title}</a>`
    itemContent.innerText = `${content}`
    
    itemImage.src=`${image}`

    homeNews.appendChild(itemTitle)
    homeNews.appendChild(itemContent)
    homeNews.appendChild(itemImage)
   


 
 });
    this.container.appendChild(homeNews)
})
}
}