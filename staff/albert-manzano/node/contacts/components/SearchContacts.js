const searchContacts = require('../logic/search-contacts');

const style = require('./SearchContacts.style');
const readline = require('readline');
let query;

function SearchContacts() {
	console.log(style.color, '===============');
	console.log(style.color, 'Search contacts');
	console.log(style.color, '===============');

	const interface = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	interface.question('Search by name:', (value) => {
		query = value
		interface.close()
	})

	searchContacts(query, (error, searchResults) => {
		if (error) throw error
		console.log(searchResults);
	});
}
module.exports = SearchContacts