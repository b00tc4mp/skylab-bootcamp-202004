# 7 Potencias

![bingo](https://i.chzbgr.com/full/8441946880/h6133FE99/bailando)

## Description

This is an oficial web site for students and potential customers interested on taking lessons in the dance school **7 Potencias**.

In this web site will be shown all relevant information about the school, like the timetables.

## Functional description

- The dance school **7 Potencias** will have three roles: user, administrator and guest.

- User registration and login.

- Registered users will have access to:

  - Profile.
  - Multimedia.
  - Buy new dance class packages.
  - Renew password and change username.

- The administrator will have access to all the functions of the website.

- The guest user will have access to basic information and make purchases of dance classes.

### Use cases

![use](./images/use-cases.png)

### Activities
<!-- TODO -->
## Technical description

### Blocks

![blocks](./images/blocks.png)

## Modules / Components

![modules](./images/modules-components.png)

## Classes
<!-- TODO -->
## Sequences

Testing

![sequences](./images/testing-sequence.png)

### Data Model

![data](./images/data-model.png)

## Code Coverage

Client-side
Server-side

## Instructions

### Server-side

#### Testing

Go to module `7-potencias-server-logic`

```sh
$: npm test
```

#### Code Coverage


```sh
$ npm run test:coverage
```

### Run

Go to module `7-potencias-api`

```sh
$ npm start
```

#### Watching (development only)

```sh
$ npm run watch
```

### Client-side

#### Testing

Go to module `7-potencias-client-logic`

```sh
$ npm test
```

##### Code Coverage

```sh
$ npm run test:coverage
```

### Run

Go to module `7-potenicias-app`

```sh
$ npm start
```

#### Enter

```sh
$ open http://localhost:3000/
```

## Link to Trello

[7 Potencias - Trello](https://trello.com/b/89PVF4pr/7-potencias)
