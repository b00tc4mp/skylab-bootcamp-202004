function Results(users) {
    Component.call(this,`<section class="results">
    </section>`);

    if (users.length) {
        const list = document.createElement('ul');

        users.forEach(function({name, surname, email}) {
            const item = document.createElement('li');

            item.innerText = `${name} ${surname} (${email})`;

            list.appendChild(item);
            
        })
        this.container.appendChild(list);

    } else {
        container.appendChild(feedback('sorry, no results :(', 'warning'));
    }

    return container;
}