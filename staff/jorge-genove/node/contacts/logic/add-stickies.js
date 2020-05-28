const fs = require('fs');
const path = require('path');
require("../utils/string");
const Email = require("../utils/email");

function addStickie(stickie, callback) {
  if (typeof stickie !== "object")
    throw new TypeError(`${stickie} is not an object`);

  const { usrname, comment} = stickie;

  if (usrname) String.validate.notVoid(usrname);


  if (comment) String.validate.notVoid(comment);

 

  const id = `${Date.now()}`;

  const file = `${id}.json`;

  fs.writeFile(
    path.join(__dirname, "..", "data",'stickies', file),
    JSON.stringify(stickie, null, 4),
    (error) => {
      if (error) return callback(error);

      callback(null, id);
    }
  );
}
module.exports = addStickie
