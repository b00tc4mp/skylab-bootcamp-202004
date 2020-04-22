const landing = Landing(
    function () {
        landing.replaceWith(register);
    },
    function () {
        landing.replaceWith(login);
    }
);

const register = Register(
    function (name, surname, email, password) {
        registerUser(name, surname, email, password);

        register.replaceWith(login);
    },
    function () {
        register.replaceWith(login);
    }
);

const login = Login(
    function (email, password) {
        authenticateUser(email, password);

        const user = retrieveUser(email);

        const home = Home(user.name, function () {
            home.replaceWith(landing);
        });


        let listDisplayed = false;
        const search = Search(function (request) {
            if (listDisplayed) home.removeChild(home.lastChild);

            const usersFound = searchUsers(request);
            const results = Results(usersFound);
            home.append(results);
            listDisplayed = true;
        });
        home.append(search);

        login.replaceWith(home);
    },
    function () {
        login.replaceWith(register);
    }
);

document.getElementById("root").appendChild(landing);