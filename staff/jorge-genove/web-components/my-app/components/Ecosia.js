class EcosiaSearch extends Component {
    constructor(onEcosiaSearch){
        super(`<section class="ecosiasearcher">
        <h2>Ecosia<h2>
        </section>`)
        
        let ecosiaResults;

        this.container.appendChild(
          new Search((ecosiaQuery) => {
            ecosiaSearch(ecosiaQuery, (error, results) => {
              if (!ecosiaResults) {
                ecosiaResults = new EcosiaResult(results).container;
    
                this.container.appendChild(ecosiaResults);
              } else {
                const _ecosiaResults = ecosiaResults;
                ecosiaResults = new EcosiaResult(results).container;
                _ecosiaResults.replaceWith(ecosiaresults);
              }
            });
          }).container
        );
    
    
    
    
    
    }


   








}
