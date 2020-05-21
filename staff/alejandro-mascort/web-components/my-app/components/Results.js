class Results extends Component {
    constructor(query) {
        const usersFound = searchUsers(query)
        
        let htmlStructure

        if (usersFound.length) {
            htmlStructure = ''

            usersFound.forEach(user => htmlStructure +=`\n<li class=results__list-item>${user.name} ${user.surname} (${user.email})</li>`)

            htmlStructure = '<section class="results">\n<ul class="results__list">\n'+htmlStructure+'\n</ul>\n<section>'
        } else {
            htmlStructure = '<section class="results">\n<p class="results__message feedback--warning">There are no matches with your request</p>\n<section>'
        }
        super(htmlStructure)
    }
}