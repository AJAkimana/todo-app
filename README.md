# ToDo APP - APIs

Awesomity Backend Challenge.

## Technologies

- Runtime environment: [Node](https://nodejs.org/)
- Backend framework: [Express.js](https://expressjs.com/)
- Authentication: [Passport.js](https://expressjs.com/) | [JWT](https://jwt.io/)
- API documentation: [Swagger](https://swagger.io/)
- APP containisation: [Docker](https://www.docker.com/)
- Storage(No): Data structure

## Installation

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

## Quick Start

The quickest way to setup the app is as shown below:

```
git clone git://github.com/AJAkimana/todo-app.git
cd todo-app
```

Install dependencies:

```bash
$ npm install
```

### Create .env file in the root directory and copy all variables from .env.example the replace them by your own

Run tests:

```bash
$ npm run test
```

Docker build docker image:

```bash
$ docker build -t {Any name you want} .
```

Build docker container from the image:

```bash
$ docker-compose up --build -d
```

Start the server:

```bash
$ npm run start
```

API documentation visit:

```bash
/api/documentation
```

## The maintainer:

[Jean d Amour Akimana](https://profile.akimanaja.com)
