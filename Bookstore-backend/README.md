# Getting Started with br_backend

This is a backend project that utilizes Jakarta and Docker for creating packaged as a WAR file.
The project is container-based, which enables easy deployment and scaling of applications.

## Prerequisites 📒
- IntelliJ Ultimate
- Docker

## Project structure 📂
The project consists of the following containers:

- db Postgres database container
- PgAdmin container for database graphical interface
- TomEE container for deploying the backend application
- Python container for pre-database configuration scripts

Each of the containers has the appropriate environment settings, ports, and volumes,
which are configured in the docker-compose.yml file. The TomEE container also has
specific settings in the tomee.dockerfile file.

## Running the Project 🏃
1. Open the `br_backend` project in IntelliJ Ultimate
2. In the Maven panel on the right, run the command `mvn install` / `mvn clean install` to build the project
3. Run the command `docker-compose build` to build the Docker images
4. Start the containers with the command `docker-compose up`
5. Access the hello-world get application at `http://localhost:8081/br_backend-1.0-SNAPSHOT/api/hello-world`
6. Project allow you to access the TomEE Manager at `http://localhost:8081/manager/html` using the credentials admin and admin.
7. After making changes to the project, repeat step 2 and then refresh the page at
`http://localhost:8081/br_backend-1.0-SNAPSHOT/api/hello-world` to see the updated application. TomEE server will take care
of redeploying your app, just wait a moment.

## Setting Up the Database 🗄️
Thanks to Docker Compose, this project automatically creates a PgAdmin server and populates the
Postgres database using the BN_script.py script in the Python container.

You can connect to the database container using the following command:
`psql -h br_database -p 5432 -U postgres -d postgres`
This will allow you to interact with the database and perform various operations.
Additionally, the PgAdmin container provides a graphical interface for managing the database,
which can be accessed by visiting `http://localhost:81` in your web browser.

The BN_script.py script is executed as part of the Python container initialization process,
which allows you to configure the database before the application is started.
This can be useful for setting up initial data or configuring database parameters.

## Endpoints 📡

Legend:

1.  🙍‍♂️ All users have access to this endpoint
2.  🔓 Only authenticated users have access to this endpoint
3.  🛡️ Only users with moderator privileges have access to this endpoint

The following endpoints are available in the application:

- GET 🙍‍♂️ `/api/hello-world`: Returns a simple "Hello, World!" message as a JSON response.
- GET 🙍‍♂️ `/api/book`: Returns a list of books stored in the database as a JSON array.
Each book object contains information such as its title, author, and publication date.
- POST 🛡️ `/api/book`: Adds a new book to the database. The book object is sent as a JSON payload.
- GET 🙍‍♂️ `/api/book/name/{name}`: Returns a list of all books having title matching `name`. This is case-insensitive.
- GET 🙍‍♂️ `/api/book/{id}`: Returns all information about book with ID `id`.
- GET 🔓 `/api/book/status/{value}`: Returns list of books as JSON array with given status value.
- GET 🙍‍♂️ `/api/book/author/{author}`: Returns list of all books having author matching `author`. This is case-insensitive.
- GET 🙍‍♂️ `/api/book/user/{userId}`: Fetch list of the books belongs to the user by `userId`.
- GET 🙍‍♂️ `/api/book/rated/{userId}`: Fetch list of the books rated by user with `userId`.
- GET 🙍‍♂️ `/api/book/year/{year}&sort={type}&page={page}&size={size}`: Returns list of books as JSON array with pagination - `page` is page number, `size` is page size,
`year` - year of publishing, `type` - possible filtering types - ['greater' - year greater than `year`, 'lower' - year lower than `year`, 'none' - year exactly the same as `year`]
- GET 🙍‍♂️ `/api/book/rating/{rating}&sort={type}&page={page}&size={size}`: Returns list of books as JSON array with pagination - `page` is page number, `size` is page size,
  `rating` - average rating, `type` - possible filtering types - ['greater' - rating greater than `rating`, 'lower' - rating lower than `rating`, 'none' - equals `rating`]
- POST 🙍‍♂️ `/api/auth/login`:  Authenticates a user by checking if the provided login and password match a record in the
Users table. Returns a JSON response containing a JWT (JSON Web Token) and a refresh token (both set to expire after a specified time period) if the authentication is successful.
- POST 🔓 `/api/auth/refresh`: Refreshes an expired JWT by generating a new one using the refresh token provided in the request body. Returns a new JWT if the refresh token is valid.
- POST 🔓 `/api/auth/logout`: Logs out a user by invalidating the refresh token provided in the request body. Returns a response indicating whether the logout was successful.
- POST 🔓 `/api/auth/update/{login}`: Updates user data. The data is sent as JSON { attribute : new_value, ... }
- POST 🙍‍♂️ `/api/auth/register`: Inserts new user into database with values sent as a JSON.
- GET 🔓 `/api/auth/user/info`: Returns information about current user as JSON.
- GET 🙍‍♂️ `/api/auth/user/info/{login}`: Returns information about user with login `login` as JSON.
- GET 🙍‍♂️ `/api/auth/user/info/id/{id}`: Returns information about user with id `id` as JSON.
- POST `/api/auth/refresh`: Refreshes an expired JWT.
- GET 🙍‍♂️ `/api/advertisement`: Gets a list of all advertisements.
- GET 🙍‍♂️ `/api/advertisement/page={page}&size={size}`: Gets a list of all advertisements with pagination, `page` is page number
`size` is page size.
- GET 🙍‍♂️ `/api/advertisement/{id}`: Returns all information about book with ID `id`.
- POST 🔓 `/api/advertisement`: Adds a new advertisement to the database. The ad object is sent as a JSON payload.
- PATCH 🔓 `/api/advertisement/{id}`: Updates advertisement with ID `id` to new values sent in JSON payload.
- GET 🙍‍♂️ `/api/rating`: Returns a list of all ratings stored in the database as a JSON array.
- POST 🔓 `/api/rating`: Adds a new rating to the database. The rating object is sent as a JSON payload.
- GET 🙍‍♂️ `/api/rating/book/{bookId}`: Returns a list of all ratings for a specific book identified by bookId.
- GET 🔓 `/api/rating/user/{userId}`: Returns a list of all ratings for a specific user identified by userId.
- GET 🙍‍♂️ `/api/bookscomment/book/{bookId}`: Returns a list of books comments with user data filtered by book `book_id` stored in the database as a JSON array.
- GET 🙍‍♂️ `/api/bookscomment/user/{userId}`: Returns a list of books comments with user data filtered by user `user_id` stored in the database as a JSON array.
- POST 🙍‍♂️ `/api/bookscomment`: Adds a new book comment to the database. The rating object is sent as a JSON payload.
- GET 🙍‍♂️ `/api/offerscomment/offer/{offerId}`: Returns a list of offers comments with user data filtered by `request_id` stored in the database as a JSON array.
- GET 🙍‍♂️ `/api/offerscomment/user/{userId}`: Returns a list of offers comments with user data filtered by `user_id` stored in the database as a JSON array.
- POST 🙍‍♂️ `/api/offerscomment`: Adds a new offer comment to the database. The rating object is sent as a JSON payload.
- POST 🔓 `/api/user/update/avatar/{id}`: Updates user avatar with new value sent as a JSON payload.

File `Book-Rating.postman_collection.json` contains a collection of basic endpoints that are ready to use
with Postman, a popular API development tool. The file can be imported into Postman to quickly test the
functionality of the endpoints and interact with the backend application.

The JWT is a token that can be used for token-based authentication in subsequent API requests. It is set to expire
after 15 seconds for security reasons, and the user will need to re-authenticate by logging in again after expiration.

The refresh token is used for obtaining new JWTs after the original JWT expires. It is set to expire after 24 hours,
which means that users can use the refresh token to obtain new JWTs within this time period without having to re-authenticate with their credentials.


## Generating OpenAPI Documentation 📖
The OpenAPI specification is generated automatically by the `openapi-generator-maven-plugin`.
To generate it locally you need to use the following command:
`mvn clean install`

## Other Useful Commands 🛠️
- `docker-compose down` - stop and remove the Docker containers
- `docker image ls` - list all Docker images
- `docker image rm <image>` - remove a Docker image
- `docker build -t <image> .` - build a Docker image with a custom tag
- `docker ps` - list all running Docker containers
- `docker rm <container> -f` - remove a running Docker container with force
- `docker run -d -p 8080:8080 --name <container> <image>` - run a Docker container with port mapping and a custom name
- `docker exec -it <image> bash` - access the shell of the running Docker container with the given name
- `docker-compose up --help` - display the Docker Compose up help information
- `docker-compose up -d` - start the Docker Compose services in detached mode
- `docker-compose up --build <container>` - start the Docker Compose service with the given name and build the image
- `docker-compose down` - stop and remove the Docker Compose services and containers

## Contributing 👥
Contributions are welcome! Please fork the repository and create a pull request.