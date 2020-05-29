require("../utils/polyfills/string");
const {
  users: { find },
} = require("../data");
const { UnexistanceError } = require("../errors/");

module.exports = (userId) => {
  String.validate.notVoid(userId);
  // Function.validate(callback)
  return new Promise((resolve, reject) => {
    find({ id: userId }, (error, [user]) => {
      if (error) return reject(error);
      if (!user)
        return reject(
          new UnexistanceError(`user with id ${userId} does not exist`)
        );
      delete user.id;
      delete user.password;
      resolve(user);
    });
  });
};
