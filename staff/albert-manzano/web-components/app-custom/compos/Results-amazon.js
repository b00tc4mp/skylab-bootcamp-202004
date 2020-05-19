class ResultsAmazon extends Component {
    constructor(results) {
        super(`<ul>
        </ul>`)       

        if (results.length) {
            
            results.forEach(({link,title,description})=>{
                const item = document.createElement('li');
                item.innerText = `${link} ${title} (${description})`;
                this.contain.appendChild(item);
            });
          
         }else {
             this.contain.appendChild(new Feedback('sorry, no results ', 'warning').contain)
     } 
    }
}

