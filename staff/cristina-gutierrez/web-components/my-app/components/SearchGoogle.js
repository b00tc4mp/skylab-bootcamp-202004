class SearchGoogle extends Component {
    constructor(googleQuery) {
        super(`<section class="results">
            </section>`)
        if(googleQuery.length) {
            const list = document.createElement("ul");
            
            googleQuery.forEach(function ({ title, content, link }) {
                const item = document.createElement("li");
        
                item.innerText = `${title} ${content} (${link})`
        
                list.appendChild(item);
            });
        
            this.container.appendChild(list);
        } else {
            this.container.appendChild(new Feedback("sorry, no results", "warning").container)
        }
    }
}