class Users extends Component {
    constructor(){
        super(`<section class="users">
            <h2>Users</h2>
        </section>`)

        
    let results

    this.container.appendChild(
      new Search((query) => {
        const users = searchUsers(query);

        if (!results) {
          results = new Results(users);

         
          this.container.appendChild(results.container);
        } else {
          const _results = results;

          results = new Results(users);

          _results.container.replaceWith(results.container);
        }
      }).container)

    }
}