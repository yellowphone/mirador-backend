# mirador_backend

## Installation

- `$ git clone https://github.com/yellowphone/mirador_backend.git`
- `$ cd mirador_backend`
- `$ npm install`
- `$ npm run start`
- Go to a browser and check out http://localhost:3000/graphql and play with GraphQL!

Make sure you are using Node v12.12.0! There is a Prisma bug with newer Node versions!

## Spin up local Postgres docker container for testing
Here is a [link](https://engineering.land.tech/understanding-docker/#:~:text=Understanding%20Docker%201%20Understanding%20the%20Docker%20Image.%20A,The%20Docker%20Ecosystem.%20...%205%20Final%20Notes.) that provides 
a good understanding to docker. These steps are going to assume that you have a 
basic understanding of docker. 

1. Create local image from docker file: `docker build -t <docker-user-id>/mirador:postgres-db .`

2. Run `docker image ls` to view the image that you just created and copy image id

3. Run `docker run -d -p 5432:5432 --name mirador-test-db -e POSTGRES_PASSWORD=mypassword -e POSTGRES_USER=test -e POSTGRES_DB=dev <image-id-from-above>` to create and start the new container.
The console will then output your new container id. Hooray. You can run `docker container ls` to
view the details about your newly running container.

4. Now you can run `docker exec -it <container-id> bash` to enter into the container.

5. You should see that backend.sql should already be in the container due to the COPY statement
from our docker file. Run `psql -U test dev < backend.sql` to import the table contents to this image.

Command to into into psql database terminal: `psql -h localhost -p 5432 -U test dev` followed by `\c dev`
to connect to the dev database

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