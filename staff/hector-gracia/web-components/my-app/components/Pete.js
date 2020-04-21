function Pete(user, pete){
    //El cuerpo de un tweet
    const temp = document.createElement('div');
    temp.innerHTML = `<section class="pete">
    <h4>${user}</h4>
    <p>${pete}</p>
</section>`
    const container=temp.firstChild;
    return container;
}