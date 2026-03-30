# A One Clothing – Full-Stack Web Application

## Project Description
This project is a full-stack web application for A One Clothing, a local outdoor clothing store in Kingston. The application includes a public storefront-style homepage, a contact form that submits messages to a MySQL database, and an admin login system that allows protected access to submitted customer messages.

## Tech Stack
- Node.js
- Express.js
- MySQL
- mysql2
- express-session
- dotenv
- HTML
- CSS
- JavaScript

## Project Structure
- `server.js` – main Express server
- `config/db.js` – MySQL database connection
- `routes/testRoute.js` – routes, authentication, CRUD
- `public/index.html` – frontend
- `public/css/style.css` – styling
- `public/js/script.js` – frontend logic
- `database.sql` – database schema and sample data
- `.env` – environment variables

## Features
- Responsive frontend UI
- Contact form submission
- Messages stored in MySQL
- Admin login/logout
- Protected admin dashboard
- View all messages
- Backend support for update/delete messages

## Installation Instructions

1. Clone the repository  
2. Open the project folder in terminal  
3. Install dependencies:

```bash
npm install

## Environment Setup (.env)

A `.env` file is already included in this project.

Open the `.env` file in the root directory and update the following values with your own credentials:

```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=aone_clothing
SESSION_SECRET=your_session_secret
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
PORT=3000