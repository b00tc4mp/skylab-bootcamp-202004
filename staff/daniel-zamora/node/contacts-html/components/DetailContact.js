module.exports = (contact) => {
    const {name, surname, email, phone, birthdate, country} = contact
    return `<secction class="detail-contact">
    <ul class="detail-contact__list">
        <li class="detail-contact__item">${name} ${surname}</li>
        <li class="detail-contact__item">${email} ${phone}</li>
        <li class="detail-contact__item">${birthdate} in ${country}</li>
    </ul>
    </secction>`
}