# Wildhacks API
A modular, extensible API for Wildhacks 2016

### Set up
* Clone repo
* `npm install`
* Install MongoDB locally [like this](https://docs.mongodb.org/manual/installation/)
* Run MongoDB locally through `mongod`
* Get the right .env file from a contributor and place it in the root project folder
* `npm start` to run on port 3000
* Go to 'localhost:3000' from your browser.


### Endpoints

#### Authentication

##### POST /auth/signup
Takes application data in it's request body and returns an authorization token in a JSON of the form: `{ token: <AUTHORIZATION TOKEN> };`. This token needs to be in the header of every request in /applications/*.

Application data includes:

* firstName
* lastName
* phoneNumber
* email
* password
* school
* year
* gender
* shirtSize
* travel
* dietaryRestrictions
* github
* personalSite
* resume (file upload)
* applicationDate
	

##### POST /auth/login
Takes email and password in request body, and returns an authorization token in a JSON of the form: `{ token: <AUTHORIZATION TOKEN> };`. This token needs to be in the header of every request in /applications/*.


#### Applications
All endpoints under /applications/* require the authentication token to be in it's header like this:

```
{
	Authorization: Bearer <AUTHORIZATION TOKEN>
}
```

##### GET /applications
Retrieve all applications.

##### GET /applications/:id
Get an application by id

##### GET /applications/:key/:value
Get by any key (in application schema) and given value.

##### POST applications/
Create an application using **form-data**.

##### PUT applications/:id
Update application with given id.

##### DELETE applications/:id
Delete application with given id.







