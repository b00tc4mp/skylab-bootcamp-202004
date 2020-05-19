const searchContacts = require('../logic/search-contacts');
const Feedback = require('./Feedback');
const style = require('./SearchContacts.style');
const readline = require('readline');
const 

function SearchContact() {
	console.log(style.color, '===============');
	console.log(style.color, 'Search contacts');
	console.log(style.color, '===============');

	const interface = readline.createInterface({
		input: process.stdin,
		output: process.stdout
    })

    interface.question('Search by name:',)
    
	searchContacts(query, (error, searchResults) => {
		console.log(searchResults)
	})
}
