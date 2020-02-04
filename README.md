# OwnClipboard
Demo [ownclipboard.com](https://ownclipboard.com)

OwnClipboard was built out of the need to copy/paste text across multiple devices via an application or direct browser access.

Also **Own**Clipboard as the name says was built to be owned, meaning that you can host your **own** clipboard on
your **own** server with same functions but this time with your data in your control.


## Tech Stack
### Frontend
- [VueJs](https://www.npmjs.com/package/vue)
- [Vue-cli](https://www.npmjs.com/package/@vue/cli)
- [Bulma](https://www.npmjs.com/package/bulma)
- [Shred-Bootstrap](https://www.npmjs.com/package/shred-bootstrap)

### Backend
- [Nodejs](https://nodejs.org) (>=12)
- [XpresserJs](https://xpresserjs.com) (>=0.2.10)
- [xjs-cli](https://xpresserjs.com/xjs-cli.html) (>=0.1.12)
- [Mysql](https://www.npmjs.com/package/mysql)


## First Time setup
We recommend you use **yarn** and already have Nodejs installed on your machine.

##### Install Xjs-Cli (One Time)
xjs-cli is the command line assistant of XpresserJs framework.
```sh
yarn global add xjs-cli
```
Global? yes global because you only need to install this once and it will assist you in all xpresser projects to generate controllers, models, events, migrations e.t.c


```
cd project_folder
```

##### Rename .Env
Rename `.env.example` to `.env` and fill in your desired settings.

##### Install all dependencies
```sh
yarn install
```

##### Build frontend files.
```sh
yarn build
```

#### Migrate your database
Out of the box without any deep dive **sqlite3** is supported. a `database.sqlite` file will be created once your server has started.

##### Install Prod Tools (one Time)
Xpresser uses Nodejs best Mysql ORM [knex](https://www.npmjs.com/package/knex), for database querying and migrations.
To install **knex** and other production tools you **must** run
```shell script
xjs install-prod-tools
```
if the above failed saying "Invalid command: install-prod-tools", run it outside your project root.
eg
```shell script
cd backend
xjs install-prod-tools
```

After installation, **knex** should be available on your machine.
Now run `xjs  migrate` to create our tables and database structure
```shell script
xjs migrate
```

### Start Backend Server
##### Development
```shell script
node server.js
# or
xjs start
```
using `xjs start` enables server auto reload using `nodemon`.

In development your server can be stopped by quitting your console.

##### Production
In production, your server will be handled by a production tool installed by `xjs install-prod-tools` called [pm2](https://www.npmjs.com/package/pm2)
```shell script
# START
xjs start --prod
# STOP
xjs stop server
```

That's all! You should have your **own**clipboard up and running on your server.


##### Compiles and hot-reloads for development
Just like every vue-cli app you can enable hot-reload using
```sh
yarn run serve
```
Note: the above will spring up a development server that will be in a different port.
Backend server also needs to be running in development in order to connect perfectly.
