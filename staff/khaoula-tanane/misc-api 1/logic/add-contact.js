require("../utils/polyfills/string");
require("../utils/polyfills/json");
const { Email } = require("../utils");
const { users, contacts } = require("../data");
const { UnexistanceError } = require("../errors");

module.exports = (userId, contact) => {
  String.validate.notVoid(userId);
  if (typeof contact !== "object")
    throw new TypeError(`${contact} is not an object`);
  // Function.validate(callback)

  const { name, surname, email, phone, birthdate, country } = contact;

  if (typeof name !== "undefined") String.validate.notVoid(name);

  if (typeof surname !== "undefined") String.validate.notVoid(surname);

  if (typeof email !== "undefined") {
    String.validate.notVoid(email);
    Email.validate(email);
  }

  if (typeof phone !== "undefined") String.validate.notVoid(phone);

  if (typeof birthdate !== "undefined") {
    String.validate.notVoid(birthdate);
  }

  if (typeof country !== "undefined") String.validate.notVoid(country);

  return new Promise((resolve, reject) => {
    users.find({ id: userId }, (error, users) => {
      if (error) return reject(error);

      if (!users.length)
        return reject(new UnexistanceError(`user with id ${userId} not found`));

      contact.user = userId;

      contacts.create(contact, (error, id) => {
        if (error) return reject(error);

        resolve(user);
      });
    });
  });
};
