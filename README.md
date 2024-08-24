# Task Manager Express

A simple Task Manager application built with Express.js and PostgreSQL. This app allows users to manage tasks by adding, updating, and deleting them. It uses EJS for rendering tasks and connects to a PostgreSQL database to persist data.

## Features

- **Add** new tasks
- **Update** existing tasks
- **Delete** tasks
- **View** tasks in a web interface

## Installation

### Prerequisites

- Node.js
- PostgreSQL

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Manish312002/task-manager-express.git
   cd task-manager-express

2. **Install dependencies:**

- npm i

3. **Set up PostgreSQL database:**

- Create a PostgreSQL database named Web Dev and set up a table named to_do with the following schema:
   ```bash
    CREATE TABLE to_do (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL
    );

4. **Configure database connection:**

   ```bash
   const db = new pg.Client({
    user: "postgres",
    password: "root",
    database: "Web Dev",
    host: "localhost",
    port: 5432
   });
   
5. **Start the server:**

- node index.js


## **API Endpoints**

 - GET /: Renders the main page with the list of tasks.
 - POST /add: Adds a new task.
    - req.body.newItem - The title of the new task.
 - POST /edit: Updates an existing task.
   - req.body.updatedItemId - The ID of the task to be updated.
   - req.body.updatedItemTitle - The new title for the task.
 - POST /delete: Deletes a task.
   - req.body.deleteItemId - The ID of the task to be deleted.
