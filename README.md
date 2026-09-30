# Job Tracker API

A simple REST API for keeping track of job applications.

I built this project using Node.js and Express.js. It allows you to add, update, delete, and view job applications.

## Tech Used

* Node.js
* Express.js
* JavaScript
* JSON file for storing data

## Features

* Add a job application
* Get all applications
* Get a single application
* Update an application
* Delete an application
* Get basic application statistics

## Setup

Clone the project and install the dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

The API will run on:

```text
http://localhost:3000
```

## Example

Get all job applications:

```http
GET /api/applications
```

Add a new application:

```http
POST /api/applications
```

Example request:

```json
{
  "company": "Google",
  "position": "Software Engineer",
  "status": "Applied"
}
```

## Project Structure

```text
job-tracker-api/
├── controllers/
├── routes/
├── data.json
├── server.js
├── package.json
├── .gitignore
└── README.md
```

## Why I Made This

I made this project to practice building REST APIs with Node.js and Express and to understand how CRUD operations work in a real project.

## License

This project is for learning purposes.
