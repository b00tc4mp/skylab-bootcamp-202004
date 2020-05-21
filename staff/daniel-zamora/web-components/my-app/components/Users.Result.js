class UserResults extends Component {
  constructor(users) {
    super(`<search class="results">
    <h2>Users<h2>
    </search>`);

    let result;

    this.container.append(new Search(query => {
      const users = searchUsers(query)
      if(!result) {

        result = new Results(users)
        this.container.append(result.container)

      } else {

        const _result = result
        result = new Results(users)
        _result.container.replaceWith(result.container)

      }
    }).container)
  }
}