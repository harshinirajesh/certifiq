CertifiQ

CertifiQ is a backend application built with Node.js and Express for managing and generating certificates. It provides APIs to handle certificate-related operations and supports reusable certificate templates.

Features

REST API built using Express

Certificate handling through dedicated routes

Supports multiple certificate templates

CORS enabled for frontend integration

JSON-based request handling

Tech Stack

Node.js

Express.js

JavaScript

npm

Project Structure
certifiq-main/
├── backend/
│   ├── assets/            # Certificate templates (images)
│   ├── certs/             # Generated certificates
│   ├── routes/            # API routes
│   ├── index.js           # Server entry point
│   ├── package.json
│   └── package-lock.json

Getting Started
Prerequisites

Node.js (v14 or above recommended)

npm

Installation

Clone the repository:

git clone https://github.com/your-username/certifiq.git


Navigate to the backend folder:

cd certifiq-main/backend


Install dependencies:

npm install

Running the Server
node index.js


The server will start on:

http://localhost:3000

API Usage

All certificate-related routes are handled through the main route file. You can test the APIs using tools like Postman or Thunder Client.

Notes

node_modules is included in the repository (not recommended for production use).

Certificate templates are stored in the assets folder.

Generated certificates are stored inside the certs directory.
