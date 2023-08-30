"use client";

import React from "react";

import axios from 'axios';

import { useRouter } from "next/navigation";

import Link from "next/link";
import Grid from "@mui/material/Grid";
import { ListItemAvatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

import styles from "@/components/Authentication/Authentication.module.css";

const ChooseLocation = () => {
    const router = useRouter();

    const [locations, setLocations] = React.useState([]);

    // Fetch location data from localStorage on component mount
    React.useEffect(() => {
        // Send an API request to retrieve the location data from the server using Axios
        axios.get('/api/get-locations')
          .then(response => {
            const data = response.data;
            // Assuming the API returns an array of location objects
            setLocations(data.locations);
          })
          .catch(error => {
            console.error('Error fetching locations:', error);
          });
      }, []);

    // Handle location selection
    const handleLocationSelect = (locationId) => {
        // Redirect back to the dashboard with selected location ID
        router.push(`/dashboard?locationId=${locationId}`);
    };

    return (
        <>
            <div className="authenticationBox" style={{ height: "70vh" }}>
                <Box
                    component="main"
                    sx={{
                        maxWidth: "510px",
                        ml: "auto",
                        mr: "auto",
                        padding: "50px 0 100px",
                    }}
                >
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <Box>
                            <Typography
                                as="h1"
                                fontSize="28px"
                                fontWeight="700"
                                mb="5px"
                            >
                                Choose Location{" "}
                                <img
                                    src="/images/google-icon.png"
                                    alt="favicon"
                                    style={{ ml: "5px", mt: "2px" }}
                                />
                            </Typography>

                            <Box>
                                <Box
                                    sx={{
                                        background: "#fff",
                                        padding: "30px 20px",
                                        borderRadius: "10px",
                                        mb: "20px",
                                    }}
                                    className="bg-black"
                                >
                                    <Grid
                                        container
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <Grid item xs={12}>
                                            <List>
                                                {locations.map((location) => (
                                                    <ListItem
                                                        key={location.id}
                                                        onClick={() =>
                                                            handleLocationSelect(
                                                                location.id
                                                            )
                                                        }
                                                    >
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                alt="Remy Sharp"
                                                                src="/static/images/avatar/1.jpg"
                                                            />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={
                                                                location.name
                                                            }
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                            <Divider />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Box>
            </div>
        </>
    );
};

export default ChooseLocation;
