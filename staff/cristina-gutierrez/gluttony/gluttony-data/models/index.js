const { model } = require("mongoose")
const { users, stores, comments } = require("./schemas")

module.exports = {
   Users: model("Users", users),
   Stores: model("Stores", stores),
   Comments: model("Comments", comments)
}