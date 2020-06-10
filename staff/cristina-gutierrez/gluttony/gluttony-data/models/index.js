const { model } = require("mongoose")
const { users, favorites, comments } = require("./schemas")

module.exports = {
   Users: model("Users", users),
   Favorites: model("Favorites", favorites),
   Comments: model("Comments", comments)
}