/* class Home extends Component {debugger
  constructor(name, callback) {
    super(`<section class="home">
    <h1>Welcome, ${name}!</h1><button>Logout</button>
</section>`);

    const button = this.container.querySelector("button");

    button.addEventListener("click", function () {
      callback();
    });

    let results;

    this.container.appendChild(
      new Search((query) => {
        const users = searchUsers(query);

        if (!results) {
          results = new Results(users);

          //this.container.appendChild(results.container)
          this.container.appendChild(results.container);
        } else {
          const _results = results;

          results = new Results(users);

          _results.container.replaceWith(results.container);
        }
      }).container
    );

    let googleresult;

    this.container.appendChild(
      new GoogleSearch((googleQuery) => {
        googleSearch(googleQuery, (error, results) => {
          if (!googleresult) {
            googleresult = new GoogleResults(results).container;

            this.container.appendChild(googleresult);
          } else {
            const _googleresult = googleresult;

            googleresult = new GoogleResults(results).container;

            _googleresult.replaceWith(googleresult);
          }
        });
      }).container
    );
    let ecosiaResults;

    this.container.appendChild(
      new EcosiaSearch((ecosiaQuery) => {
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
  


     printNews(results => {
      const homenews = new HomeNews(results)
        this.container.appendChild(homenews.container)
      
    })
 
 
 
 
 
 
    }
}

 */

 function Home({name}) {
 return <section className="home">
  <h1>Welcome,{name}!</h1><button>Logout</button>
</section>
 
}