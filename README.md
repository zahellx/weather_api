# weather_api

# RESTful API Node Server
RESTful API built with Node.js, Express, and Mongodb client.

## Quick Start

To quickly set up the project, you can use Docker.

Make sure to add a valid `https://api.openweathermap.org/data/3.0/onecall` URL to the configuration file.

To get the project running, execute the following Docker commands: `npm run docker` and `docker:test`. This will start a MongoDB instance and the application, with all configurations properly linked and the dependencies installed.

First, run the `npm run docker` command to install the dependencies.

## Table of Contents

- [Commands](#commands)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Logging](#logging)
- [Linting](#linting)
- [Improvements](#improvements)

## Commands
    /**
     * Available npm commands:
     *
     * - start: Runs the migration script and starts the application.
     * - test: Runs the Jest test suite with additional options.
     * - debug: Runs the migration script and starts the application in debug mode.
     * - docker: Builds and starts the application using Docker in production mode.
     * - docker:dev: Builds and starts the application using Docker in development mode.
     * - docker:test: Builds and starts the application using Docker in test mode.
     * - lint: Runs the ESLint linter on the project.
     */

## Configuration

Configuration is done using [config](https://github.com/node-config/node-config#readme).
The configuration variables can be found and modified in the `/config/default.yml` file. They come with these default values:

```bash
{
    "mongo": {
        "url": "mongodb://user:user@mongo:27017/weather?authSource=admin",
        "dbName": "weather",
        "weather": {
            "expirationMilliseconds": 10800000
        }
    },
    "weatherService": {
        "baseUrl": "https://api.openweathermap.org/data/3.0/onecall",
        "apiKey": "<apiKey>"
    },
    "server": {
        "port": "3000"
    }
}
```

## Project Structure

The project structure is organized as follows:

- `config/`: Contains configuration files.
- `migrations/`: Contains migration scripts.
- `mongo-init-scripts/`: Contains MongoDB initialization scripts.
- `src/`: Contains the source code of the application.
    - `controllers/`: Contains route controllers, responsible for handling HTTP requests and responses.
    - `database/`: Contains MongoDB related files and logic.
    - `docs/`: Contains Swagger files for API documentation.
    - `middlewares/`: Contains Express middlewares and middleware configurations.
    - `routes/v1/`: Contains API routes.
    - `services/`: Contains business logic and service layer.
    - `utils/`: Contains utility classes and functions.
    - `validations/`: Contains request data validation schemas.
    - `app.js`: The main Express app file.
    - `index.js`: The entry point of the application.
- `tests/`: Contains test files.


## API Documentation

To view the list of available APIs and their specifications, run the server and go to `https://localhost:3000/api/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

Please note that the "Try it out" option is currently not functional due to a limitation in the plugin, which does not support the query object format.

### API Endpoints

List of available routes:

**Weather routes**:

- `GET /v1/weather` - Retrieves all weather data. This endpoint provides the complete object from openWeatherMap and includes additional filters such as exclude and hour. With these filters (`where[exclude]` and `where[hour]`), the other two endpoints are not necessary. However, as per the technical specifications, this is an additional endpoint.

- `GET /v1/weather/daily` - Retrieves daily and hourly data. This endpoint provides both the hourly and daily sections.

- `GET /v1/weather/hourly` - Retrieves hourly data by hour. This additional endpoint returns only the entries from the hourly section that match the specified hour filter (between 0 and 23).


## Error Handling

The app has a centralized error handling mechanism.

## Validation

Request data is validated using [Joi](https://joi.dev/).

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

## Logging

Import the logger from `utils/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.


## Linting

Linting is done using [ESLint](https://eslint.org/).

## Improvements

- Instead of searching for an entry and replacing it if the expiration time is over, create an index that deletes the entry when the expiration time is over.
- Create a general endpoint with a filter that can be used with the same result as the other two endpoints.
- Add a `where` format for the queries that provides more versatility. Here are some examples:

```javascript
const queries = [
    'where[and][0][parameter]=My%20Post&where[and][1][parameter]=Hello',
    'where[or][0][parameter]=My%20Post&where[or][1][parameter]=Hello',
    'where[parameter][gt]=900',
    'where[parameter]=true',
    'where[limit]=5',
    'where[order]=parameter DESC',
    'where[skip]=50',
    'where[parameter][gt]=2014-04-01T18:30:00.000Z',
    'where[parameter][near]=153.536,-28.1',
    'where[parameter][between][0]=0&where[parameter][between][1]=7',
    'where[parameter][like]=foo',
    'where[parameter][nlike]=foo',
    'where[parameter][inq]=foo,bar,baz'
];
```

- Add MongoDB migrations to add an index by `lon` and `lat`.

