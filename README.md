# Tech-Blog-Challenge-14

## Description

A tech blog with a SQL backend published to Render developed with the MVC paradigm.

Features account support, commenting, editing and deleting.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)
- [Repository](#repository)

## Installation

Deployed to [Render](https://tech-blog-challenge-14.onrender.com/) @ https://tech-blog-challenge-14.onrender.com/

## Usage

To make posts, an account will be need to be created under the Sign Up button. After that, user can click on the Dashboard button and is presented with a form to make a Post.
Once a Post is made, it is stored in the database and can be seen on the dashboard and the homepage. The Post can be selected for editing/deleting on the dashboard.
Posts may also be commented on, which will also be stored in the database. Finally, a Post (along with all comments on the Post) can be deleted.
Session is set to expire after 30 minutes which will log out the User by destroying the session.

## License

[MIT License](https://spdx.org/licenses/MIT.html)

## Contributing

base code from University of Minnesota's fullstack bootcamp, the section 14 mini-project

pg [https://www.postgresql.org/](https://www.postgresql.org/) to interact with the database

dotenv [https://www.dotenv.org/](https://www.dotenv.org/) to protect database and login information

express [https://expressjs.com/](https://expressjs.com/) Web framework for Node.js

sequelize [https://sequelize.org/](https://sequelize.org/) ORM to interact with Postgres

handlebars [https://handlebarsjs.com/](https://handlebarsjs.com/) templating engine

bcrypt [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt) password hashing

connect-session-sequelize [https://www.npmjs.com/package/connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) SQL session store using Sequelize.js

## Tests

Try/catch calling to find errors. Validates are used on sequelize models to restrict invalid inputs.

## Questions

For any questions:

Find me on [github](https://github.com/talanvord)!

Send me an [email](mailto://talanvor_divine@yahoo.com)!

## Repository

[https://github.com/TalanvorD/Tech-Blog-Challenge-14](https://github.com/TalanvorD/Tech-Blog-Challenge-14)

## Screenshot

![screenshot](https://raw.githubusercontent.com/TalanvorD/Tech-Blog-Challenge-14/main/Tech-Blog-Challenge-14-screenshot.jpg)

## Render deployment

[https://tech-blog-challenge-14.onrender.com/](https://tech-blog-challenge-14.onrender.com/)
