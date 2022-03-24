# Contacts api

### Set up the project

- First clone this repository in your machine
- Open the terminal and run ```npm install```
- Then ```cd contact-cli```
- Once you're in contact-cli directory run ```npm install```
- Then ```npm link```

## Starting the api

- To start the api simply write ```npm start``` in the contact-api terminal

### URL ENDPOINTS

- Find all contacts:
  - GET http://localhost:5000/api/v1/contacts/get-all-contacts/
  - response:
  ```
    {
    "contacts": [
    {
    "_id": "623b42e40b7b30c17054b0b0",
    "firstName": "aaaaaaaaa",
    "lastName": "testing1",
    "email": "testing1@gmail.com",
    "phoneNumber": "+355673493391",
    "__v": 0
    },
    {
    "_id": "623b50d259f0784bf8bbf874",
    "firstName": "testing",
    "lastName": "testing1",
    "email": "testing1@gmail.com",
    "phoneNumber": "+355671234565",
    "__v": 0
    },
    {
    "_id": "623b554fc7a6decd70901d13",
    "firstName": "testing",
    "lastName": "testing1",
    "email": "testing1@gmail.com",
    "phoneNumber": "+3556712345658334",
    "__v": 0
    }
    ],
    "totalCount": 3,
    "pageNumber": 1,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPreviousPage": false
    }
  ```
- Filtering by query:
  - GET http://localhost:5000/api/v1/contacts/get-all-contacts/?firstName=firstName&lastName=lastName&page=2&limit=10&email=email&phoneNumber=phoneNumber
- Find one contact by id:
  - GET http://localhost:5000/api/v1/contacts/contact-by-id/:id
- Create a contact:
  - POST http://localhost:5000/api/v1/contacts/create-contact
  - body:
  ```
    {
    "firstName":"testing",
    "lastName": "testing1",
    "email":"testing1@gmail.com",
    "phoneNumber":"+355671234567"
    }
  ```
  - response:
  ```
    {
    "status": "ok",
    "data": {
    "firstName": "testing",
    "lastName": "testing1",
    "email": "testing1@gmail.com",
    "phoneNumber": "+355673493391",
    "\_id": "623c6e2883fe25f67646d4fa",
    "\_\_v": 0
    }
    }
  ```
- Delete a contact:
  - DELETE http://localhost:5000/api/v1/contacts/contact-by-id/:id
- Update a contact:
  - PATCH http://localhost:5000/api/v1/contacts/update-contact/:id
  - body:
   ```
   {
    "firstName":"testing",
    "lastName": "testing1",
    "email":"testing1@gmail.com",
    "phoneNumber":"+355673493391"
    }
  ```
  - response:
   ```
   {
    "status": "ok",
    "data": {
    "\_id": "623bae4533144ffb830ccd6f",
    "firstName": "testing",
    "lastName": "testing1",
    "email": "testing1@gmail.com",
    "phoneNumber": "+355673493391",
    "\_\_v": 0
    }
    }
   ```
    
### Cli information

- After setting up the project open a git bash terminal and ```cd contact-cli```
- IMPORTANT!!! Make sure the api is running at the same time in the other terminal.
- Run $```contact``` in the git bash terminal

  - response

> Usage: contact [options] [command]
>
> Options:
>
> -V, --version output the version number
> -h, --help display help for command
>
> Commands:
> getall            
> get all contacts
> set
> delete, get, update or create a contact
>
> help [command] display help for command

- Run $```contact getall``` to find all contacts
- Run $```contact set delete``` and when ?```Enter the id of the contact that you want to delete``` simply type the id to delete a contact
- Run $```contact set getbyid``` and when ?```Enter the id of the contact that you want to find``` simply type the id to find a contact by id
- Run $```contact set create``` and answer the questions about the data to create a contact
- Run $```contact set update``` and answer the questions about the data to update a contact


### Metrics

- Creating a contact with over 1000 contacts in the database
  - [https://github.com/onomdev/contacts-api/blob/main/screenshots/create.png?raw=true]









