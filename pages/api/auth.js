const { Router } = require("express");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
// const session = require("express-session");
// const { urlencoded } = require("body-parser");

const dotenv = require("dotenv"); // Import dotenv

dotenv.config(); // Load environment variables from .env file

// Access the environment variables
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URL } = process.env;

// Google API Client
// const oauth2Client = new OAuth2Client({
//     client_id: process.env.GOOGLE_CLIENT_ID,
//     client_secret: process.env.GOOGLE_CLIENT_SECRET,
//     redirect_uri: process.env.REDIRECT_URL,
// });

const oauth2Client = new google.auth.OAuth2(
    "1003712320461-rlt9cbndvmeeta700h2194s1s5p916d5.apps.googleusercontent.com",
    "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",
    "http://localhost:3000/api/auth"
);

// Function to securely store access tokens
const storeTokens = (req, tokens) => {
    // Store the tokens in the session
    req.session.tokens = tokens;
};

// Function to get the stored tokens
const getTokens = (req) => {
    // Retrieve the tokens from the session
    return req.session.tokens;
};

// Function to get user-specific information from the Google Business Profile API
const getUserInfo = async (accessToken) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        const response = await axios.get(
            "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
            config
        );

        console.log("account raw: ", response.data.accounts);

        const accounts = response.data.accounts.map((account) => ({
            id: account.name,
            name: account.accountName,
            // locations: account.locations.map((location) => ({
            //     id: location.name,
            //     name: location.locationName,
            // })),
        }));

        console.log("GBP accounts: ", accounts);

        return accounts;
    } catch (error) {
        // Log the specific error details
        console.error("getUserInfo API error:", error);

        // Rethrow the error to handle it in the calling function
        throw error;
    }
};

const router = Router();

// POST route to initiate the authentication process
router.post("/api/auth", async (req, res) => {
    try {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: [
                "https://www.googleapis.com/auth/business.manage",
                // Add other required scopes here
            ],
        });
        res.status(200).json({ url: authUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

// GET route to handle the callback from Google API
router.get("/api/auth", async (req, res) => {
    try {
        console.log("req query: ", req.query);
        const code = req.query.code;
        if (!code) {
            res.status(400).json({
                error: "Authorization code not provided",
            });
            return; // Terminate the request handling here
        } else {
            console.log("callback code: ", code);
        }

        try {
            const { tokens } = await oauth2Client.getToken(code);
            oauth2Client.setCredentials(tokens);
            storeTokens(req, tokens);
            const accounts = await getUserInfo(tokens.access_token);
            req.session.user = {
                accounts,
            };
            res.redirect("/google");
        } catch (error) {
            console.error("Token exchange error:", error);
            res.status(500).json({
                error: "Failed to retrieve access tokens",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

// Add a new route to handle API requests to the Google Business Profile
router.get("/api/business-profile/:accountId/:locationId", async (req, res) => {
    const tokens = getTokens(req);

    if (!tokens) {
        res.status(401).json({ error: "Not authenticated" });
        return;
    }

    const user = req.session.user;
    if (!user) {
        res.status(401).json({
            error: "User information not found in the session",
        });
        return;
    }

    const { accountId, locationId } = req.params;
    if (!accountId || !locationId) {
        res.status(400).json({ error: "Invalid account or location ID" });
        return;
    }

    try {
        // Set the access token in the request headers
        const config = {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`,
            },
        };

        // Make a request to the Google Business Profile API using the user-specific information
        const response = await axios.get(
            `https://www.googleapis.com/business/v3/accounts/${accountId}/locations/${locationId}`,
            config
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profile data" });
    }
});

module.exports = router;
