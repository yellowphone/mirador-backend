# mirador_backend

## Installation

- `$ git clone https://github.com/yellowphone/mirador_backend.git`
- `$ cd mirador_backend`
- `$ npm install`
- `$ npm run start`
- Go to a browser and check out http://localhost:4000/graphql and play with GraphQL!

Make sure you are using Node v12.12.0! There is a Prisma bug with newer Node versions!

## Spin up local Postgres docker container for testing
Here is a [link](https://engineering.land.tech/understanding-docker/#:~:text=Understanding%20Docker%201%20Understanding%20the%20Docker%20Image.%20A,The%20Docker%20Ecosystem.%20...%205%20Final%20Notes.) that provides 
a good understanding to docker. These steps are going to assume that you have a 
basic understanding of docker. 

1. Run `docker run -d -p 5432:5432 --name mirador-local-db -e POSTGRES_PASSWORD=mysecretpassword postgres:latest` to create and start the new container.

2. Now you can run `docker exec -it mirador-local-db bash` to enter into the container.

3. You can finally run this command to connect from the command line 
`psql -h localhost -p 5432 -U postgres -W`

if you already have a postgres client running on your computer,
you might be able to connect instantly.

4. Create a database schema via `CREATE DATABASE mirador;`
Then run `\q` to quite the db.

4. Now you need to import the default schema that we currently have for 
the database. You can do this via PgAdmin or copy the contents of 
backend.sql to your clipboard, create a backend.sql file in the container
and finally copy them to the database via `psql -U postgres mirador < backend.sql`. For this, you might have to download vim to your container 
and such. If you have issues, hit Bailey up.


5. Then to connect to the db via the terminal with ``
Command to into into psql database terminal: `psql -h localhost -p 5432 -U postgres -W` followed by `\c mirador`. Now you can run sql commands in
the console to see if you are getting things correct. 

6. the DATABASE_URL should be: 
`postgres://postgres:mysecretpassword@localhost:5432/mirador`

Any issues, text Bailey.

## Contributors

<table>
  <tr>
    <td align="center">
        <a href="https://github.com/baileyg2016" target="_blank"><img src="https://avatars3.githubusercontent.com/u/23178729?s=460&v=4" width="100px;" alt=""/>
            <br />
            <sub><b text-align="center">Bailey Spell</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/geomin76" target="_blank"><img src="https://avatars2.githubusercontent.com/u/31418725?s=460&v=4" width="100px;" alt=""/>
            <br />
            <sub><b text-align="center">Geo Min</b></sub>
        </a>
    </td>
  </tr>
</table>