import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import useGetDocumentWhere from "../../../firebase/useGetDocumentWhere";
import sendSMS from "../../../firebase/sendSMS";

const ChatBox = ({ patientNumber, messages, idx }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            chatMessage: data.get("chatMessage"),
        });
        const chatMessage = data.get("chatMessage");

        const business = {
            id: "X5xnQE4nqjRTmQDQzc3H",
            twilioNumber: "+19142792060",
        };

        const practiceUser = {
            id: "3WNdxv3reGWEkw3To6fofqYRYio1",
        };

        const { result, error } = sendSMS(
            business,
            patientNumber,
            practiceUser,
            chatMessage
        );

        if (error === null) data.delete("chatMessage");

        console.log("result of sending SMS: ", result);
    };

    const {
        doc = patient,
        error,
        loading,
    } = useGetDocumentWhere("users", "cellPhone", patientNumber.slice(2));

    if (loading) return <div>...Loading</div>;

    console.log("Messages in ChatBox: ", messages);

    return (
        <>
            <Box
                sx={{
                    border: "1px solid #F5F4F6",
                    borderRadius: "14px",
                }}
                className="for-dark-chat-box"
            >
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #F5F4F6",
                        borderRadius: "10px",
                        p: "15px",
                    }}
                    className="for-dark-chat-header"
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <img
                            src="/images/user1.png"
                            alt="user"
                            width="40px"
                            height="40px"
                            className="borRadius100"
                        />
                        <Box className="ml-1">
                            <Typography as="h5" fontWeight="500">
                                {doc === null ? patientNumber : doc.displayName}
                            </Typography>
                            <Typography fontSize="12px" position="relative">
                                <span className="active-status2 successBgColor"></span>{" "}
                                Active Now
                            </Typography>
                        </Box>
                    </Box>

                    <Box>
                        <div className="right-replay-box">
                            <IconButton
                                size="small"
                                sx={{ background: "#F2F6F8" }}
                                className="ml-5px for-dark-button"
                            >
                                <MoreVertIcon />
                            </IconButton>

                            <div className="hover-caption">
                                <List sx={{ display: "inline" }}>
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            sx={{
                                                padding: "1px 15px",
                                            }}
                                        >
                                            <ReplyIcon
                                                fontSize="small"
                                                sx={{
                                                    mt: "-4px",
                                                }}
                                                className="mr-5px"
                                            />
                                            <ListItemText
                                                primary="Reply"
                                                primaryTypographyProps={{
                                                    fontSize: "12px",
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton
                                            sx={{
                                                padding: "1px 15px",
                                            }}
                                        >
                                            <DeleteOutlineIcon
                                                fontSize="small"
                                                sx={{
                                                    mt: "-4px",
                                                }}
                                                className="mr-5px"
                                            />
                                            <ListItemText
                                                primary="Delete"
                                                primaryTypographyProps={{
                                                    fontSize: "12px",
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </div>
                        </div>
                    </Box>
                </Box>

                {/* Chat List */}
                <div className="chat-list-box">
                    {messages.map((message, idx) =>
                        message.direction === "in" ? (
                            <Box
                                key={message.id}
                                sx={{
                                    display: "flex",
                                    maxWidth: "730px",
                                    mb: "20px",
                                }}
                            >
                                {/* Left Chat */}
                                <img
                                    src="/images/user1.png"
                                    alt="user"
                                    width="35px"
                                    height="35px"
                                    className="borRadius100"
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                    }}
                                    className="ml-1"
                                >
                                    <Box>
                                        <Typography
                                            sx={{
                                                background: "#F5F6FA",
                                                borderRadius:
                                                    "0px 15px 15px 15px",
                                                p: "14px 20px",
                                                mb: "10px",
                                            }}
                                            className="dark-BG-101010"
                                        >
                                            {message.message}
                                        </Typography>

                                        <Typography fontSize="12px">
                                            {message.timestamp
                                                ?.toDate()
                                                .toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ) : (
                            <Box
                                key={message.id}
                                sx={{
                                    display: "flex",
                                    justifyContent: "end",
                                    maxWidth: "730px",
                                    mb: "20px",
                                }}
                                className="ml-auto"
                            >
                                {/* Right Chat */}
                                <Box
                                    sx={{
                                        display: "flex",
                                    }}
                                    className="ml-1"
                                >
                                    <Box className="mr-1">
                                        <Typography
                                            sx={{
                                                background: "#757FEF",
                                                color: "#fff !important",
                                                borderRadius:
                                                    "15px 0 15px 15px",
                                                p: "14px 20px",
                                                mb: "10px",
                                            }}
                                        >
                                            {message.message}
                                        </Typography>

                                        <Typography
                                            fontSize="12px"
                                            textAlign="end"
                                        >
                                            {message.timestamp
                                                ?.toDate()
                                                .toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                        </Typography>
                                    </Box>
                                </Box>

                                <img
                                    src="/images/user2.png"
                                    alt="user"
                                    width="35px"
                                    height="35px"
                                    className="borRadius100"
                                />
                            </Box>
                        )
                    )}
                </div>

                {/* Footer */}
                <Box
                    sx={{
                        background: "#F5F6FA",
                        borderRadius: "15px",
                        display: "flex",
                        alignItems: "center",
                        p: "15px",
                        position: "relative",
                    }}
                    className="dark-BG-101010"
                >
                    <Box>
                        <IconButton
                            size="small"
                            sx={{ background: "#F2F6F8" }}
                            className="mr-5px for-dark-button"
                        >
                            <VideocamIcon />
                        </IconButton>

                        <IconButton
                            size="small"
                            sx={{ background: "#F2F6F8" }}
                            className="mr-5px for-dark-button"
                        >
                            <CallIcon />
                        </IconButton>
                    </Box>

                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{
                            flex: "auto",
                        }}
                        className="pr-60px"
                    >
                        <TextField
                            fullWidth
                            id="chatMessage"
                            label="Type Something..."
                            name="chatMessage"
                            autoComplete="typeSomething"
                            InputProps={{
                                style: {
                                    borderRadius: 100,
                                    background: "#fff",
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                textTransform: "capitalize",
                                borderRadius: "100%",
                                fontWeight: "500",
                                fontSize: "16px",
                                padding: "0",
                                minWidth: "44px",
                                minHeight: "44px",
                                position: "absolute",
                                top: "22px",
                                color: "#fff !important",
                            }}
                            className="right-20px"
                        >
                            <SendIcon />
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ChatBox;
