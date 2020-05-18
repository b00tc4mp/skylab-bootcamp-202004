const userData = {
  name: null,
  surname: null,
  phone: null,
  email: null,
  web: null,
  instagram: null,
  facebook: null,
  twitter: null,
  tiktok: null,
};
const readline = require("readline")
fs = require("fs")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question("What is your name ? ", function (name) {
  userData.name = name;
  rl.question("What is your surname ? ", function (surname) {
    userData.surname = surname;
    rl.question("What is your number ?", function (number) {
      userData.phone = number;
      rl.question("What is your e-mail ? ", function (email) {
        userData.email = email;
        rl.question("What is your website ? ", function (web) {
          userData.web = web;
          rl.question("What is your instagram ? ", function (instagram) {
            userData.instagram = instagram;
            rl.question("what is you facebook ? ", function (facebook) {
              userData.facebook = facebook;
              rl.question("what is your twitter ? ", function (twitter) {
                userData.twitter = twitter;
                rl.question("What is your tiktok ? ", function (tiktok) {
                  userData.tiktok = tiktok;
                  rl.close();
                })
              })
            })
          })
        })
      })
    })
  })
})

rl.on("close", function () {
  console.log("Saving contact")

  saveUser(userData.name + userData.surname, 0)
});
saveUser = (path, index) => {
  fs.access(path + index + ".txt", fs.F_OK, (error) => {
    if (error) {
      fs.writeFile(path + index + ".txt", JSON.stringify(userData), () => {
        console.log("\nContact saved as " + path + index + ".txt")
        process.exit(0)
      })
    } else {
      saveUser(path, index + 1)
    }
  })
}
