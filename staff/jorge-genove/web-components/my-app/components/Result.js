class Result extends Components {
  constructor(user) {
    super(`<section class="results"></section>`);

    if (user.length) {
      const list = document.createElement("ul");

      user.forEach(function ({ name, surname, email }) {
        const item = document.createElement("li");

        item.innerText = `${name} ${surname} (${email})`;
        list.appendChild(item);
      });

      this.container.appendChild(list);
    } else
      this.container.appendChild(
        new Feedback("sorry, no results :(", "warning")
      );
  }
}
