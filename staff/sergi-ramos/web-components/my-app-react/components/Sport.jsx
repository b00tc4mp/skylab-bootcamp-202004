function Sport()  {
    

       
       
            listResults.forEach( (singleResult) => { updateResults += `\n<a href='${singleResult.link}'><h2>${singleResult.title}</h2></a><img src='${singleResult.linkImg}'>`})

            return<section class="resultsSport">
                        <hr/>
                     ${updateResults}
                        
                    </section>           
    
}