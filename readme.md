# Authenticate Site

This is a Node.js-based authentication system that uses JWT for secure login, Google reCAPTCHA for spam prevention, and rate-limiting to prevent brute-force attacks. It also includes token expiration warnings and user profile management.

## Features

- **User Registration & Login:** Allows users to register and log in.
- **JWT Authentication:** Secures the session with JWT stored in HTTP-only cookies.
- **Google reCAPTCHA:** Verifies user authenticity to prevent bot login attempts.
- **Rate Limiting:** Limits the number of login attempts to protect against brute-force attacks.
- **Token Expiry Warning:** Warns users when their session is about to expire.
- **Profile Management:** Allows users to view and manage their profile.

## Prerequisites

Before you begin, ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [PostgresSQL](https://www.postgresql.org/)

Additionally, you'll need:

- **Google reCAPTCHA Site Key** and **Secret Key** to integrate reCAPTCHA for login security.

## Setting Up the `.env` File

Create a `.env` file in the root of your project and include the following environment variables:

### Explanation of Variables:

- **PORT**: The port your app will run on (default: `5000`).
- **JWT_SECRET**: Your secret key for signing JWT tokens.
- **RECAPTCHA_SITE_KEY**: The site key for Google reCAPTCHA.
- **RECAPTCHA_SECRET_KEY**: The secret key for Google reCAPTCHA.
- **DB_HOST**: The host of your MySQL database (default: `localhost`).
- **DB_USER**: Your MySQL database username.
- **DB_PASSWORD**: Your MySQL database password.
- **DB_NAME**: Your MySQL database name.

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/kshitizSharma405/assignment.git
cd assignment
npm install
```

## Running the Application

To run the application locally, follow these steps:

1. Make sure you have installed all dependencies. Run the following command:

   ```bash
   npm install
   npm install -g nodemon
   nodemon server.js
   ```
