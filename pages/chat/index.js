"use client";

import React from "react";

import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import ChatBox from "@/components/Apps/Chat/ChatBox";
import ChatTab from "@/components/Apps/Chat/ChatTab";

import ChatBoxTwo from "@/components/Apps/Chat/ChatBoxTwo";
import ChatBoxThree from "@/components/Apps/Chat/ChatBoxThree";

import firebase_app from "../../firebase/config";

import {
    getFirestore,
    collection,
    onSnapshot,
    query,
    where,
    orderBy,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

// Search field style
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 100,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 20,
    width: "100%",
    [theme.breakpoints.up("xs")]: {
        marginRight: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    color: "#757FEF",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    right: "0",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "5",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        backgroundColor: "#F5F7FA",
        borderRadius: "30px",
        padding: theme.spacing(1.4, 0, 1.4, 2),
    },
}));

export default function Chat() {
    const [tabIndex, setTabIndex] = React.useState(0);

    const autoFocusRef = React.useRef(null);

    // scroll to bottom after ever sent message
    const scrollToBottom = () => {
        autoFocusRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const { user } = useAuthContext();

    const router = useRouter();

    React.useEffect(() => {
        // if (user == null) router.push("/authentication/lock-screen.js");

        // define collection
        const q = query(
            collection(db, "chats"),
            where("businessId", "==", "X5xnQE4nqjRTmQDQzc3H"),
            orderBy("timestamp")
        );

        // define function
        const unsubscribe = onSnapshot(
            q,
            (querySnapchot) => {
                let ar = [];

                querySnapchot.docs.forEach((doc) => {
                    ar.push({ id: doc.id, ...doc.data() });
                });

                console.log("Message Arr: ", ar);
                let mapByPatientNum = {};

                ar.forEach((message) => {
                    if (!(message.patientNumber in mapByPatientNum))
                        mapByPatientNum[message.patientNumber] = [];
                    mapByPatientNum[message.patientNumber].push(message);
                });

                console.log(mapByPatientNum);

                setMessages(mapByPatientNum);
                setLoading(false);
            },
            (error) => {
                console.log("Error Getting Chat Messages: ", error);
                setError(error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    if (loading) {
        return <div>...loading</div>;
    }
    console.log("MEssages: ", messages);

    return (
        <>
            {/* Page title */}
            <div className={styles.pageTitle}>
                <h1>Chat</h1>
                <ul>
                    <li>
                        <Link href="/">Dashboard</Link>
                    </li>
                    <li>Chat</li>
                </ul>
            </div>

            <Tabs
                className="chat-tabs"
                selectedIndex={tabIndex}
                onSelect={(index) => {
                    scrollToBottom();
                    setTabIndex(index);
                }}
            >
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
                >
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
                        <Card
                            sx={{
                                boxShadow: "none",
                                p: "20px",
                                mb: "15px",
                            }}
                        >
                            <Typography
                                as="h1"
                                sx={{
                                    fontSize: 17,
                                    fontWeight: 500,
                                    mb: 1,
                                }}
                            >
                                Messages
                            </Typography>

                            {/* Search */}
                            <Search className="ls-search-form">
                                <SearchIconWrapper className="search-btn">
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search here.."
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </Search>

                            {/* All Messages */}
                            <Typography mb="10px">
                                <i className="ri-message-2-line"></i> ALL
                                MESSAGES
                            </Typography>

                            <TabList>
                                {Object.entries(messages).map(
                                    ([patientNumber, chats], idx) => (
                                        <Tab key={idx}>
                                            <ChatTab
                                                patientNumber={patientNumber}
                                                topMessage={
                                                    chats[chats.length - 1]
                                                }
                                            />
                                        </Tab>
                                    )
                                )}
                            </TabList>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
                        <Card
                            sx={{
                                boxShadow: "none",
                                p: "25px 20px",
                                mb: "15px",
                                borderRadius: "10px",
                            }}
                        >
                            {Object.entries(messages).map(
                                ([patientNumber, messages], idx) => (
                                    <TabPanel key={idx}>
                                        {/* ChatBox */}
                                        <ChatBox
                                            patientNumber={patientNumber}
                                            messages={messages}
                                            autoFocusRef={autoFocusRef}
                                        />
                                    </TabPanel>
                                )
                            )}
                        </Card>
                    </Grid>
                </Grid>
                {/* <div ref={autoFocusRef}></div> */}
            </Tabs>
        </>
    );
}
