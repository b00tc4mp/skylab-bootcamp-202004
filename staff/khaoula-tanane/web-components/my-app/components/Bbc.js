class Bbc extends Component{
    constructor(callback){
        super(`<section>
        <button>BBC NEWS</button>
      </section>`)

    const button = this.container.querySelector("button");
   
    button.addEventListener("click", (event) => {
        event.preventDefault();
            callback()
      })

    }
}