// Import necessary modules and packages
const next = require("next");
const express = require("express");
// require("express-async-errors");
const { Router } = require("express");

const axios = require("axios");
const session = require("express-session");
const { urlencoded } = require("body-parser");
const handleAuth = require("./pages/api/auth"); // Import the auth route
const dotenv = require("dotenv"); // Import dotenv

dotenv.config(); // Load environment variables from .env file

// Access the environment variables
const { SESSION_SECRET } = process.env;

// Create a Next.js instance
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Start the Next.js app
app.prepare().then(() => {
    const server = express();

    // Set up session middleware for securely storing tokens
    server.use(
        session({
            secret: "valentinamontoyazaviermontoya",
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: true,
                maxAge: 24 * 60 * 60 * 1000, // Set to 1 day in milliseconds
            },
        })
    );

    server.use(urlencoded({ extended: false }));

    // Handle the /api/auth route with the handleAuth function
    server.use(handleAuth);

    // Handle all other routes with Next.js app
    server.all("*", (req, res) => {
        return handle(req, res);
    });

    // Start the server on the desired port
    server.listen(3000, (err) => {
        if (err) throw err;
        console.log("> Readyness on http://localhost:3000");
    });
});
