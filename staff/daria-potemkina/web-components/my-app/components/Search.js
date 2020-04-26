class Search extends Component {
  constructor(query) {
    super(`<section class="search">
    <form>
      <input type="text" name="query">
      <button type="submit">🔍</button>
    </form>
    <form>
      <input type="text" name="googlequery">
      <button type="submit">Google Search 🧐</button>
    </form>
    <form>
      <input type="text" name="ecosiaquery">
      <button type="submit">Ecosia 🌳</button>
  </form>
  <section>`)

    const [form, googleForm, ecosiaForm] = this.container.querySelectorAll("form");

    let feedback;

    form.addEventListener("submit", event => {
      event.preventDefault();

      const request = event.target.query.value

      cleanUp()

      try {
        query(request)

      } catch (error) {

        showError(error)
      }

      googleForm.reset()
      ecosiaForm.reset()
    });

    googleForm.addEventListener("submit", event => {
      event.preventDefault();

      const requestGoogle = event.target.googlequery.value

      cleanUp()

      try {
        query(undefined, requestGoogle);
        
      }catch(error){
        
        showError(error)
      }

      form.reset()
      ecosiaForm.reset()
    });

    ecosiaForm.addEventListener("submit", event => {
      event.preventDefault();

      const requestEcosia = event.target.ecosiaquery.value
      cleanUp()

      try{
        query(undefined, undefined, requestEcosia);
      }catch(error){

        showError(error)
      }
    
      form.reset()
      googleForm.reset()
    });

    const showError = (error) => {
      if (!feedback) {
        feedback = new Feedback(error.message, 'error')

        this.container.appendChild(feedback.container)

      } else feedback.innerText = error.message
    }

    const cleanUp = () => {
      if (feedback) {
        this.container.removeChild(feedback.container)

        feedback = undefined
      }
    }

  }
}
