class googleResults extends Component {
  constructor(matchingList) {
    super(`<section class="result">
      </section>`);
    let feedback;
    if (matchingList.length) {
      const list = document.createElement("ul");
      this.container.appendChild(list);

      for (let i = 0; i < matchingList.length; i++) {
        list.innerHTML += `<li>${matchingList[i].title}</li>`;
        list.innerHTML += `<li>${matchingList[i].description}</li>`;
        list.innerHTML += `<a href="${matchingList[i].link}">${matchingList[i].link}</a>`;
        list.innerHTML += `<hr>`;
      }
    } else {
      feedback = new Feedback("You have 0 results :(", "warning");
      this.container.appendChild(feedback.container);
    }
  }
}
