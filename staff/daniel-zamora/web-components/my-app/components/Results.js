function Results(result) {
    const temp = document.createElement('div')

    temp.innerHTML = `<search class="results">
    <ul>${result}</ul>
    </search>`

    const container = temp.firstChild;

    return container
}