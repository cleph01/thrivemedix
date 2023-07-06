"use client";

import { Box, Typography, Badge } from "@mui/material";

// import Badge from "@mui/material/Badge";
import React from "react";

import getDocumentFromField from "../../../firebase/getDocumentFromField";
import useGetDocumentWhere from "../../../firebase/useGetDocumentWhere";

const ChatTab = ({ patientNumber, topMessage }) => {
    // const [patient, setPatient] = React.useState(null);
    // const [loading, setLoading] = React.useState(true);

    // React.useEffect(() => {
    //     const { result = patient, error } = getDocumentFromField(
    //         "users",
    //         "cellPhone",
    //         patientNumber.slice(2)
    //     );

    //     if (patient !== null) setPatient(patient);

    //     setLoading(false);
    // }, [patientNumber]);

    const {
        doc = patient,
        error,
        loading,
    } = useGetDocumentWhere("users", "cellPhone", patientNumber.slice(2));

    if (loading) return <div>...Loading</div>;

    console.log("Patient Number: ", patientNumber, topMessage, doc);
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                    }}
                >
                    <img
                        src="/images/user1.png"
                        alt="User"
                        width="45px"
                        height="45px"
                        className="borRadius100"
                    />
                    <span className="active-status successBgColor"></span>
                </Box>

                <Box className="ml-1">
                    <Typography
                        as="h4"
                        fontSize="13px"
                        fontWeight="500"
                        mb="5px"
                    >
                        {doc === null ? patientNumber : doc.displayName}
                    </Typography>
                    <Typography fontSize="12px">
                        {topMessage.message}
                    </Typography>
                </Box>
            </Box>

            <Box textAlign="right">
                <Typography
                    sx={{
                        color: "#A9A9C8",
                        fontSize: "11px",
                    }}
                >
                    {topMessage.timestamp
                        .toDate()
                        .toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                </Typography>

                <Box className="mr-10px">
                    <Badge
                        badgeContent={2}
                        color="primary"
                        className="for-dark-text-white"
                    ></Badge>
                </Box>
            </Box>
        </Box>
    );
};

export default ChatTab;
