const { Router } = require("express");
const { google } = require("googleapis");

const axios = require("axios");
// const session = require("express-session");
// const { urlencoded } = require("body-parser");

const dotenv = require("dotenv"); // Import dotenv

dotenv.config(); // Load environment variables from .env file

// Access the environment variables
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URL } = process.env;

console.log(
    "env creds: ",
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URL
);

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URL
);



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

// Function to get user-specific information from the Google Business Profile API
const getLocationInfo = async (accessToken, accountId) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        // Got format for axios request from Google API page:
        // https://developers.google.com/my-business/content/location-data#list_locations
        // https://developers.google.com/my-business/reference/businessinformation/rest/v1/accounts.locations
        const response = await axios.get(
            `https://mybusinessbusinessinformation.googleapis.com/v1/accounts/${accountId.slice(
                accountId.indexOf("/") + 1
            )}/locations?readMask=name,title`,
            config
        );

        console.log("location raw: ", response.data.locations);

        const locations = response.data.locations.map((location) => ({
            id: location.name,
            name: location.title,
        }));

        return locations;
    } catch (error) {
        // Log the specific error details
        console.error("getLocationInfo API error:", error);

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
        // console.log("req query: ", req.query);

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

            // Store the tokens in session
            req.session.tokens = tokens;

            const accounts = await getUserInfo(tokens.access_token);
            req.session.user = {
                accounts,
            };

            // For simplicity, assuming there's only one account for now
            const accountId = accounts[0].id;

            // Gets location info using the account ID and stores it in local storage
            const locations = await getLocationInfo(
                tokens.access_token,
                accountId
            );

            // In this approach, the server-side code stores the locations data in a server-side
            // session that will be accessed by a call to the "get-locations" endpoint
            req.session.locations = locations;

            // Redirect to the choose-location page
            res.redirect("/google/choose-location");
        } catch (error) {
            console.error("Callback error:", error);
            res.status(500).json({
                error: "Callback Failed",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

// Gets Location data saved in session from the Auth Callback (getLocations function above)
router.get("/api/get-locations", (req, res) => {
    try {
        console.log("Session object: ", req.session);
        // Check if the user has selected a location
        if (!req.session || !req.session.locations) {
            res.status(400).json({ error: "Locations not found" });
            return;
        }

        const locations = req.session.locations;

        res.status(200).json({ locations });
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({ error: "Internal server error" });
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
