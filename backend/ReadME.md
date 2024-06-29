# Node.js TypeScript Server Side

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## Installation
- npm install

## Usage
- To Start the server in development mode:
- cd backend
- npm run start

## Project Structure
.
├── backend
│   ├── controllers
│   │   └── taskManagment.ts
│   │   └── users.ts
│   ├── baseDAO
│   │   └── baseDAO.ts
│   │   └── firebase-key.json
│   ├── routes
│   │   └── route.ts
│   ├── auth
│   │   └── auth.ts
│   ├── shared
│   │   └── validation.ts
│   │   └── types.ts
│   └── app.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md


## Environment Variables

PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=0000
DB_NAME=warriors
SALT=7
JWT_SECRET=warriors


## Contributing
1-Fork the repository.
2-Create a new branch (git checkout -b feature/your-feature).
3-Make your changes.
4-Commit your changes (git commit -m 'Add some feature').
5-Push to the branch (git push origin feature/your-feature).
6-Open a pull request.

