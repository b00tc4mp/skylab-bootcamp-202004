class Results extends Component {
    constructor(users){
        super(`<section class="results">
        <h2>Results of users</h2>
        </section>`)

        if(users.length){
            
            const list = document.createElement('ul');

            users.forEach( ({name, surname,email})=>{
                const item = document.createElement('li');
                item.setAttribute('class','results__list')
                item.innerText = `${name} ${surname} - (${email})`;
                list.appendChild(item);
            });

            this.container.appendChild(list);
        }else{
            this.container.appendChild(new Feedback('sorry, we don`t find any results','warning').container)
        }
    }
}
