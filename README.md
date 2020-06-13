[![Maintainability](https://api.codeclimate.com/v1/badges/660d94d0066a658ae731/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/get2it-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/660d94d0066a658ae731/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/get2it-be/test_coverage)

# API Documentation

#### 1️⃣ Backend deployed at [Heroku]https://get2itpt9.herokuapp.com/api <br>

## 1️⃣ Getting started

## **Local Server Installation**
For developing and testing purposes, please follow the instructions below to install a version to your local machine.

Installing
1. download/clone backend repo
2. navigate to cloned repo
3. install dependencies on your console: `npm i`
4. install knex globally: `npm i -g knex`
5. construct a copy of the data base in console: `knex migrate:latest`
6. populate database with dummy/seeded data: `knex seed:run`
7. create a .env file and include JWT_SECRET=''
8. run the server: `npm run server`. Server port default is 3300.

### Backend framework goes here

Node.js

## 2️⃣ Endpoints

#### Register New User
#### **POST** to *https://get2itpt9.herokuapp.com/api/auth/register*

Request: `req.body`

```
{
  username: "test1",        // String Required
  password: "Test123"      // String Required
  email: "email@email.com"        // String Required
}
```

Response: `res.body`
```
{
  "id": 6,
  "username": "test1",
  "email": "email@email.com"
}
  // password not returned, but is stored encrypted on database.
```

Returns newly created user object as well as JSON Web Token (JWT)


#### Login Existing User
POST to https://get2itpt9.herokuapp.com/api/auth/login

```
{
  email: email@email.com,        // String Requried
  password: Test123!      // String Requried
}
```
Response: `res.body`
```
{
    "message": "Welcome TEST1",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo2LCJ1c2VybmFtZSI6IlRFU1QxIiwiaWF0IjoxNTgzMDg1MjQ4LCJleHAiOjE1ODMwODg4NDh9.dSaZfJ9cGPAJYmgoIoZ-hrQPEXQeiMEs4ckOJDEgliw"
}
```

#### Edit user info
PUT to https://get2it.herokuapp.com/api/auth/edit-profile/:id



#### Create a new task
POST to https://get2it.herokuapp.com/api/users/:id/tasks

User creates a new task.

Request: `req.body`

```
{
  name: 'Task 1',
  date: '2020-06-08T00:00:00.000Z',
  start_time: '7:19 pm',
  end_time: '7:19 pm',
  task_icon: '',
}
```
Response: `res.body`

```
{
          user_id: 1,
          name: 'Task 1',
          status: null,
          date: '2020-06-08T00:00:00.000Z',
          start_time: '7:19 pm',
          end_time: '7:19 pm',
          task_icon: '',
          timeLeft: null,
          initialNotify: null,
          notifyOn: false

}
```

#### Get tasks by user
GET to https://get2it.herokuapp.com/api/users/:id/tasks

Returns all tasks for a single user, via the **user's** `:id` URL param.

Request: `req.body`

```
// N/A
```
Response: `res.body`
```
[
        {
          user_id: 1,
          name: 'Task 1',
          status: null,
          date: '2020-06-08T00:00:00.000Z',
          start_time: '7:19 pm',
          end_time: '7:19 pm',
          task_icon: '',
          timeLeft: null,
          initialNotify: null,
          notifyOn: false
        },
        {
          user_id: 1,
          name: 'Task 2',
          status: null,
          date: '2020-06-09T00:00:00.000Z',
          start_time: '7:19 pm',
          end_time: '7:19 pm',
          task_icon: '',
          timeLeft: null,
          initialNotify: null,
          notifyOn: false
        }
]
```

#### Update a task
PUT to https://get2it.herokuapp.com/api/users/tasks/:id

Updates an existing task via the **task's** `:id` URL param.

Request: `req.body`

```
{
  name: 'Task 1',
  date: '2020-06-08T00:00:00.000Z',
  start_time: '7:19 pm',
  end_time: '7:19 pm',
  task_icon: '',
}
```
Response: `res.body`

Returns JSON object with edited values.

```
{
  user_id: 1,
  name: 'Task 2',
  status: null,
  date: '2020-06-09T00:00:00.000Z',
  start_time: '7:19 pm',
  end_time: '7:19 pm',
  task_icon: '',
  timeLeft: null,
  initialNotify: null,
  notifyOn: false
}
```

#### Delete a task
DELETE to https://get2it.herokuapp.com/api/users/tasks/:id

Deletes a task for a single user, via the **tasks's** `:id` URL param.

Request: `req.body`

```
// N/A
```
Response: `res.body`
```
{removed: deletedItem}
```


# Data Model


#### 2️⃣ ORGANIZATIONS


#### USERS

```

## 2️⃣ Actions

// Users
find()
findBy(filter)
add(user)
findById(id)
update(changes, id)
deleteUser(id)

// Tasks
find()
findById(id)
findTasks(id)
add(task)
update(task, id)
remove(id)

// Categories
find()
findById(id)
findCategories(id)
add(category)
update(category, id)
remove(id)

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/get2it-fe/blob/master/README.md) for details on the fronend of our project.
