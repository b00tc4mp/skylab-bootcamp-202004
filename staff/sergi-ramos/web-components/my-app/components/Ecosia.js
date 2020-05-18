class Ecosia extends Components {
    constructor(listResults) {

        let updateResults = ''
       
            listResults.forEach( (singleResult) => { updateResults += `\n<a href='${singleResult.link}'><h2>${singleResult.title}</h2></a><p>${singleResult.content}</p>`})

            super(`<section class="resultsEcosia">
                        <hr/>
                     ${updateResults}
                        
                    </section>`)            
    }
}