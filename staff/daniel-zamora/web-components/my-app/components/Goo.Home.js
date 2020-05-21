class HomeGoo extends Component {
  constructor(goUsers, logOut) {
    super(`<section class="google">
    <h2>Google</h2>
</section>`);

    let googleResult;

    this.container.append(new Search(query => {
        google(query, webs => {
          if(!googleResult){
            googleResult = new ResultsGoo(webs)
            this.container.append(googleResult.container)
          } else {
            const _googleResult = googleResult;

            googleResult = new ResultsGoo(webs)

            _googleResult.container.replaceWith(googleResult.container)
          }
        })
      }).container)
    }
  }