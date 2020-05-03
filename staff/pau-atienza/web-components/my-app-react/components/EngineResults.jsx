


// class ResultUser extends Component{
//     constructor(input){super(`<ul class= "search"></ul>`)
//         if(!input[0]){
//             this.container.appendChild(new Feedback('No results were found', 'warning').container)
//         } 
//         else {
//             for (let i in input){
//                 let resultItem = document.createElement("li");
               
//                 resultItem.innerHTML= `${input[i].name} ${input[i].surname}, ${input[i].email}`
//                 this.container.appendChild(resultItem)      
//             }
//         }   
//     }
// }

function EngineResults({results}){

    let processResults = (results) => {
        return (results.map(({ title, content, link }) => {
            return <li>
                <a href = {link}>{title}</a>
                <p>{content}</p>
            </li>})
        )
    }

    return <>
        <section className="results--engine">
            {results &&<ul>{processResults(results)}</ul>}
            {results === [] && <Feedback message="No results were found" level="warning" />}
        </section>
    </>
}