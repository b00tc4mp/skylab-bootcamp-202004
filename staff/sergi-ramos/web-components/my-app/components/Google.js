class Google extends Components {
    constructor(listResults) {

        let updateResults = ''
       
            listResults.forEach( (singleResult) => { updateResults += `\n<h2>${singleResult.title} </h2><p>${singleResult.content}</p><a href="${singleResult.link}">${singleResult.link}</a>` })

            super(`<section class="resultsGoogle">
                        <hr/>
                     ${updateResults}
                        
                    </section>`)            
    }
}