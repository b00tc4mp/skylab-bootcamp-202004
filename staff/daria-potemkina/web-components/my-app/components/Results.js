class Results extends Component {
  constructor(matchingList) {
    super(`<section class="result">
      </section>`)
    let feedback
    if (matchingList.length) {
      const list = document.createElement('ul');
      const listItems = document.createElement('li');

      for (let i = 0; i < matchingList.length; i++) {
        listItems.innerHTML = `${matchingList[i].name} ${matchingList[i].surname} (${matchingList[i].email})`;
        list.append(listItems);
      }
      this.container.appendChild(list);
    } else {
      feedback = new Feedback('sorry, you has 0 results :(', 'warning')
      this.container.appendChild(feedback.container);
    }
  }
}