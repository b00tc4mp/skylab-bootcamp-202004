const fs = require('fs');
const path = require('path');
require("../utils/polyfills/string");
const uid = require("../utils/uid");

function addStickie(userId,stickie, callback) {
  if (typeof stickie !== "object")
    throw new TypeError(`${stickie} is not an object`);

  const { usrname, comment} = stickie;

  if (usrname) String.validate.notVoid(usrname);


  if (comment) String.validate.notVoid(comment);

 

  const id = uid()
  stickie.stickieId = id
  stickie.userId = userId
  const file = `${id}.json`;

  fs.writeFile(
    path.join(__dirname, "..", "data",'stickies', file),
    JSON.stringify(stickie, null, 4),
    (error) => {
      if (error) return callback(error);

      callback(null, stickie.stickieId);
    }
  );
}
module.exports = addStickie
