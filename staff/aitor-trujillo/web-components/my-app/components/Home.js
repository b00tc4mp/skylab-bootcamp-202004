// TODO show "Welcome, <name>!"
function Home(user, callback) {
  const temp = document.createElement("div");

  temp.innerHTML = `<section class="home">
        <h1>Welcome, ${user.name}!</h1>
        <button class='logout'>Logout</button>
  </section>`;

  const container = temp.firstChild;

  const logout = container.querySelector(".logout");

  logout.style.background = "red";

  logout.addEventListener("click", callback());

  return container;
}
