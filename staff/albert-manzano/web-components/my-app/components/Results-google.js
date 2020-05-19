class ResultsGoogle extends Component {
    constructor(results) {
        super(`<ul>
        </ul>`)       

        if (results.length) {
            // let list = document.createElement('ul')
            
            results.forEach(({link,title,description})=>{
                const item = document.createElement('li');
                // const _link = document.createElement('a')
                // const _title = document.createElement('h3')
                // const _description = document.createElement('p')

                // _link.innerText = link
                // _title.innerText = title
                // _description.innerText = description

                // item.append(link)
                // item.append(title)
                // item.append(description)

                item.innerText = `${link} ${title} (${description})`;
                this.container.appendChild(item);
            });
          
         }else {
             this.container.appendChild(new Feedback('sorry, no results :(', 'warning').container)
     } 
    }
}

