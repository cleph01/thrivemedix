import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

// Function to initiate the Google OAuth sign-in process
const handleSignInWithGoogle = async () => {
    try {
        const response = await axios.post("/api/auth"); // Use the auth API route to start the sign-in process
        window.location.href = response.data.url; // Redirect the user to the Google OAuth sign-in page
    } catch (error) {
        console.error("Failed to initiate Google OAuth sign-in", error);
    }
};

// Function to fetch profile data from the API for the selected account and location
const fetchProfileData = async () => {
    try {
        const response = await axios.get(`/api/user-profile`); // Use the new user-profile API route
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch profile data");
    }
};

const GoogleBusinessProfile = () => {
    // Define state to hold the selected account and location
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    // Define a query to fetch the user-specific information from the API
    const { isLoading, isError, data, error } = useQuery(
        "profileData",
        fetchProfileData,
        {
            enabled: !!selectedAccount && !!selectedLocation, // Only fetch when account and location are selected
        }
    );

    // Handle loading and error states
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    // Check if the user has signed in with Google OAuth
    if (!data || !data.accounts) {
        // User is not signed in, display a button to initiate sign-in
        return (
            <div>
                <h2>Google Business Profile</h2>
                <button onClick={handleSignInWithGoogle}>
                    Sign in with Google
                </button>
            </div>
        );
    }

    // Render the profile data
    return (
        <div>
            <h2>Google Business Profile</h2>
            <div>
                <label>Select Account:</label>
                <select
                    value={selectedAccount}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                >
                    <option value="">-- Select Account --</option>
                    {/* Render the list of accounts from the user session here */}
                    {/* For example, if accounts are stored in session as req.session.user.accounts */}
                    {data?.accounts?.map((account) => (
                        <option key={account.id} value={account.id}>
                            {account.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Select Location:</label>
                <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                >
                    <option value="">-- Select Location --</option>
                    {/* Render the list of locations for the selected account here */}
                    {/* For example, if locations are stored in session as req.session.user.accounts[x].locations */}
                    {selectedAccount &&
                        data?.accounts
                            ?.find((account) => account.id === selectedAccount)
                            .locations.map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))}
                </select>
            </div>
            {data && (
                <div>
                    <p>Name: {data.name}</p>
                    <p>Phone: {data.phone}</p>
                    {/* Add other profile data fields here */}
                </div>
            )}
        </div>
    );
};

export default GoogleBusinessProfile;
