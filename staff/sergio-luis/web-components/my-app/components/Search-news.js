class SearchNews extends Component {
    constructor(onSubmit){
        super(`<section class="search">
        <form class='search__form'>
            <img class='search__img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTAVbcnhPYct1ZwEb_t97gpynVds1gIEAABv6dPv3azVrdXwoYM&usqp=CAU'> 
            <div class='search__container'>
                <h2 class='search__input'>Last News</h2>
                <button class='search__button' >🗞️</button>
            <div>    
        </form>
    </section>`)

        const form = this.container.querySelector('form');

        form.addEventListener('submit', event =>{
            event.preventDefault();
            onSubmit();
        })
    }
}