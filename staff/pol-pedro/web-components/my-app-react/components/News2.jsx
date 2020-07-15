const {useState, useEffect} = React

function News2({onload, results}) { //handel errors
    useEffect( () => {
       newsVandal ((found) => { 
           onload(found)
       }) 
   }, [])

       return <section class="news-grid2">
           {results && results.map(({textTitle, link}) => <div><a href={`${link}`} target="blank"><h1>{textTitle}</h1></a></div>)}
       </section>
}
