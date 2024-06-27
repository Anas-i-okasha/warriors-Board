## USER ##

Column      |  type
-------------------------------------
id          | SERIAL PRIMARY KEY
first_name  | VARCHAR(255)
last_name   | VARCHAR(255)
email       | VARCHAR(50)
password    | text
is_admin    | boolean
created_at  | TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
is_deleted  | boolean
-------------------------------------

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(50),
    password TEXT,
	is_admin Boolean,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);


## Task ## FireBase (firestore)

Column      |  Type
-------------------------------
id          | SERIAL PRIMARY KEY
title       | VARCHAR(255)
description | VARCHAR(2550)
status      |
is_deleted  | boolean
created_at  | TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
user_id     | INTEGER REFERENCES users(id) ON DELETE SET NULL
-------------------------------------------------------------
CREATE TYPE task_status AS ENUM (
    'Queue', 
    'Under-Design', 
    'Under-Development', 
    'bugFixing/Code-Review', 
    'Under-Testing', 
    'Done', 
    'Reject'
);

# Create the 'tasks' table with a foreign key referencing 'users'
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(2550),
    status task_status,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);

##
- User query used by postgresQL DB, and task manager will be saved in firestore (firebase).