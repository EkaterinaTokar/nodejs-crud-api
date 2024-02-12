# nodejs-crud-api

## Installation

1. Clone repo
2. Install dependencies npm install

### How to run

**Start sever in development mode**
npm run start:dev

**Start sever in production mode**
npm run start:prod

### Endpoints

**GET (all users)**
example request: localhost:4000/api/users

- Server should answer with status code 200 and all users records

**GET (one user)**
example request: localhost:4000/api/users/{userId}
_id — unique identifier (uuid) generated on server side_

- Server should answer with status code 200 and record with id === userId if it exists
- Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
- Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

**POST (create one user)**
example request: localhost:4000/api/users
_id — unique identifier (uuid) generated on server side_
_!!Please make sure to fill in the body with a valid JSON containing name, hobbies and age parameters_

*Server should answer with status code 201 and newly created record
*Server should answer with status code 400 and corresponding message if request body does not contain required fields

**PUT (update one user)**
example request: localhost:4000/api/users/{userId}
_id — unique identifier (uuid) generated on server side_
_!!Please make sure to fill in the body with a valid JSON containing name, hobbies and age parameters_

- Server should answer with status code 200 and updated record
- Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
- Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

**DELETE (delete one user)**
example request: localhost:4000/api/users/{userId}
_id — unique identifier (uuid) generated on server side_

- Server should answer with status code 204 if the record is found and deleted
- Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
- Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

I suggest that all the requests be checked in Postman.
