// pages/api/user-profile.js

import { getUserInfo } from "../../auth"; // Import the getUserInfo function from auth.js

export default async function handler(req, res) {
    try {
        const user = await getUserInfo(req.session.tokens.access_token);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch user profile data" });
    }
}
