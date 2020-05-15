describe("follow-user", () => {
  let emailFollower, selfemail;

  describe("when user already exists", () => {
    let name, surname, password, email;

    beforeEach(() => {
      users.length = 0;
      name = names.random();
      surname = surnames.random();
      email = `${name
        .toLowerCase()
        .split(" ")
        .join("")}${surname.toLowerCase().split(" ").join("")}@mail.com`;
      password = passwords.random();

      users.push({ name, surname, email, password });

      selfemail = email;
    });

    describe("when following already exists", () => {
      beforeEach(() => {
        const name = names.random(),
          surname = surnames.random(),
          email = `${name
            .toLowerCase()
            .split(" ")
            .join("")}${surname.toLowerCase().split(" ").join("")}@mail.com`,
          password = passwords.random();

        users.push({ name, surname, email, password });
        emailFollower = email;
      });

      it("it must suceed", () => {
        followUser(emailFollower, selfemail);

        const user = users.find((user) => user.email === emailFollower);

        expect(user).to.exist;
        expect(user.name).to.equal(name);
        expect(user.email).to.equal(emailFollower);
        expect(user.surname).to.equal(surname);
        expect(user.password).to.equal(password);

        expect(user.following).to.exist;
        expect(user.following).to.have.length(1);

        const [_emailFollower] = user.following;
        expect(_emailFollower).to.equal(emailFollower);
      });
    });
  });
});
