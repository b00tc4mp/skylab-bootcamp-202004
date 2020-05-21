// TODO web
module.exports = () => {
    return `<nav class="landing">
    <ul class="contacts">
        <li>
            <a class="contacts__add" href="/add-contact">ADD</a>
        </li>
        <li>
            <a class="contacts__list" href="/list-contacts">LIST</a>
        </li>
        <li>
            <a class="contacts__search" href="/search">SEARCH</a>
        </li>
        <li>
            <a class="contacts__detail" href="/detail">DETAIL</a>
        </li>
    </ul>
</nav>`
}