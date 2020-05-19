const addContact = require('./logic/add-contact')

const questions = ["name", "surname", "number", "e-mail", "website",
"instagram", "facebook", "twitter", "tiktok"]

addContact(questions)

const totalResult = require("./logic/list-contacts");
totalResult(error, console.log)