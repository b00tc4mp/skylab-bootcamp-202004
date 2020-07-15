const fs = require("fs");
const path = require("path");

const stickieList = (callback) => {
  fs.readdir(
    path.join(__dirname, "..", "data", "stickies"),
    (error, totalDir) => {
      if (error) throw error(error);

      function extractData(files = totalDir, count = 0, stickiesList = []) {
        fs.readFile(
          path.join(__dirname, "..", "data", "stickies", files[count]),
          (error, data) => {
            if (error) return callback(error);

            const stickie = JSON.parse(data);
            stickiesList.push(stickie);
            count++;
            if (count < files.length) extractData(files, count, stickiesList);
            else {
              callback(null, stickiesList);
            }
          }
        );
      }
      extractData();
    }
  );
};

module.exports = stickieList;
