describe("tweet", function () {
  let name, surname, email, password, token;

  beforeEach(function (done) {
    name = names.random();
    surname = surnames.random();
    email = `${name
      .toLowerCase()
      .split(" ")
      .join("")}${surname.toLowerCase().split(" ").join("")}@mail.com`;
    password = passwords.random();

    call(
      "POST",
      "https://skylabcoders.herokuapp.com/api/v2/users",
      {
        user: `${name}`,
        surname: `${surname}`,
        email: `${email}`,
        password: `${password}`,
      },
      { "Content-type": "application/json" },
      (error, status, body) => {
        if (error) return done(new Error(error));
        if (status !== 201) return done(new Error("unexpectet status"));

        call(
          "POST",
          "https://skylabcoders.herokuapp.com/api/v2/users/auth",
          `{ "username": "${email}", "password": "${password}" }`,
          { "Content-type": "application/json" },
          (error, status, body) => {
            if (error) return done(new Error(error));
            if (!status === 200) return done(new Error("unexpectet status"));

            const { token } = JSON.parse(body);

            done();
          }
        );
      }
    );
  });
  describe("Add tweets", () => {
    it("should succeed on post tweet", (done) => {
      tweet(
        token,
        { message: "hello world", date: new Date(Date.now()) },
        (error, undefined) => {
          expect(error).to.be(undefined);
          expect(token).not.to.be(undefined);
          expect(date).not.to.be(undefined);
          expect(message).to.exist;
          expect(tweets.length).to.be(1);

          done();
        }
      );
    });
  });
});
