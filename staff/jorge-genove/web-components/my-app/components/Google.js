class GoogleSearch extends Component {
    constructor(onGoogleSubmit) {
        super(`<section class="googlesearch">
    <h2>Google</h2>
</section>`)

let googleresult;

this.container.appendChild(
  new Search((googleQuery) => {
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

    }

}