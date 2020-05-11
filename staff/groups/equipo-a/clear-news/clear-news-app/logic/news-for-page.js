function newsForPage(news, currentPage){
    const NEWS_FOR_PAGE = 20

    const indexOfLastItem = currentPage*NEWS_FOR_PAGE
    const indexOfFirstItem = indexOfLastItem - NEWS_FOR_PAGE
    const currentNews = news.slice(indexOfFirstItem, indexOfLastItem)

    return currentNews

}