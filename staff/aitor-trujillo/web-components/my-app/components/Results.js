function Results(matchingList) {
  const temp = document.createElement("div");

  temp.innerHTML = `<section class="results">
    <ul>
    </ul>
  </section>`;

  const container = temp.firstChild;

  const listedItems = container.querySelector("ul");

  for (let i = 0; i < matchingList.length; i++) {
    listedItems.innerHTML += `<li>${matchingList[i].name} ${matchingList[i].surname} (${matchingList[i].email})</li>`;
  }

  return container;
}
