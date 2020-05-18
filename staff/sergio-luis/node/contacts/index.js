const AddContact = require('./components/AddContact');
const ListContact = require('./components/ListContacts');
const orderBy = require('./utils/order-by')

ListContact((error,data)=> {
    if(error) console.error(error.message);

    console.table(data.orderBy('email'))
})
