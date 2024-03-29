"use client";
// pocowwqxpyflscyw

import * as React from "react";

import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Checkbox from "@mui/material/Checkbox";
import styles from "@/styles/PageTitle.module.css";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { PermScanWifi } from "@mui/icons-material";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import sendEmail from "../../firebase/sendEmail";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

// Create new user Modal
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};
// End Create new user Modal

function MembersLists(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </Box>
    );
}

MembersLists.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(id, name, image, userName, email, tags, permission) {
    return {
        id,
        name,
        image,
        userName,
        email,
        tags,
        permission,
    };
}

const rows = [
    createData(
        "001",
        "Evangelina Mcclain",
        "/images/user1.png",
        "@jstevenson5c",
        "jordansteve@gmail.com",
        "HTML, CSS & JS",
        "editor"
    ),
    createData(
        "002",
        "Candice Munoz",
        "/images/user2.png",
        "@candice3unoz",
        "candicemunoz@gmail.com",
        "React, Next.js",
        "editor"
    ),
    createData(
        "003",
        "Mike Mcclain",
        "/images/user3.png",
        "@mike4mcclain",
        "mikemcclain@gmail.com",
        "Angular, Gatsby",
        "editor"
    ),
    createData(
        "004",
        "Bernard Langley",
        "/images/user4.png",
        "@bernardlangley",
        "bernardlangley@gmail.com",
        "HTML, React & Sass",
        "editor"
    ),
    createData(
        "005",
        "Kristie Hall",
        "/images/user5.png",
        "@kristie7hall",
        "kristiehall@gmail.com",
        "React, Next.js & Sass",
        "editor"
    ),
    createData(
        "006",
        "Bolton Obrien",
        "/images/user6.png",
        "@bolton4obrien",
        "boltonobrien@gmail.com",
        "Angular, HTML & Sass",
        "editor"
    ),
    createData(
        "007",
        "Dee Alvarado",
        "/images/user7.png",
        "@dee3alvarado",
        "deealvarado@gmail.com",
        "React, Next.js & Sass",
        "editor"
    ),
    createData(
        "008",
        "Cervantes Kramer",
        "/images/user8.png",
        "@cervantes4kramer",
        "cervantes4kramer@gmail.com",
        "Gatsby, React & Sass",
        "editor"
    ),
    createData(
        "009",
        "Dejesus Michael",
        "/images/user9.png",
        "@dejesus1michael",
        "dejesusmichael@gmail.com",
        "React, Gatsby & Sass",
        "editor"
    ),
    createData(
        "010",
        "Alissa Nelson",
        "/images/user10.png",
        "@alissa1nelson",
        "alissa1nelson@gmail.com",
        "React, Gatsby & Sass",
        "owner"
    ),
    createData(
        "012",
        "Milton",
        "/images/user11.png",
        "@milton",
        "milton@gmail.com",
        "React, HTML & Sass",
        "editor"
    ),
    createData(
        "013",
        "Claude",
        "/images/user12.png",
        "@claude",
        "claude@gmail.com",
        "React, Gatsby & Sass",
        "editor"
    ),
    createData(
        "014",
        "Joshua",
        "/images/user13.png",
        "@joshua",
        "joshua@gmail.com",
        "React, Gatsby & Sass",
        "editor"
    ),
    createData(
        "015",
        "Harvey",
        "/images/user14.png",
        "@harvey",
        "harvey@gmail.com",
        "React, Gatsby & Sass",
        "editor"
    ),
    createData(
        "016",
        "Antonio",
        "/images/user15.png",
        "@antonio",
        "antonio@gmail.com",
        "React, Gatsby & Sass",
        "admin"
    ),
    createData(
        "017",
        "Julian",
        "/images/user16.png",
        "@julian",
        "julian@gmail.com",
        "React, Gatsby & Sass",
        "editor"
    ),
    createData(
        "018",
        "Harold",
        "/images/user17.png",
        "@harold",
        "harold@gmail.com",
        "React, Gatsby & Sass",
        "editor"
    ),
    createData(
        "019",
        "Kingston",
        "/images/user18.png",
        "@kingston",
        "kingston@info.com",
        "React, Gatsby & Sass",
        "editor"
    ),
].sort((a, b) => (a.name < b.name ? -1 : 1));

export default function MembersList() {
    // Save User Permission from Create New User Select Input form
    const [permission, setPermission] = React.useState("");

    const handlePermissionChange = (event) => {
        setPermission(event.target.value);
    };

    const [openSnackBar, setOpenSnackBar] = React.useState(false);

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackBar(false);
    };

    // Table
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Create new user modal
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setOpenSnackBar(true);

        const data = new FormData(event.currentTarget);

        const firstName = data.get("firstName");
        const lastName = data.get("lastName");
        const email = data.get("email");

        const payload = {
            businessId: "X5xnQE4nqjRTmQDQzc3H",
            senderId: "3WNdxv3reGWEkw3To6fofqYRYio1",
            to: email,
            firstName: firstName,
            lastName: lastName,
            subject: "Register to TextMedix",
            html: "<h2>You're Invited</h2><span> Testing HTML</span><div><p><strong>Booya!</strong></p><a href='www.google.com' target='_blank' style='text-docration: none; color: red'>Click this link</div>",
            text: "This is the plaing text look",
            permission: permission,
            firstName: firstName,
            lastName: lastName,
        };

        console.log("invite payload: ", payload);

        const { result, error } = sendEmail(payload);

        if (error) {
            console.log("error: ", error);
        } else {
            console.log("result: ", result);
        }
    };
    // End Add Task Modal

    return (
        <>
            {/* Page title */}
            <div className={styles.pageTitle}>
                <h1>User Management</h1>
                <ul>
                    <li>
                        <Link href="/">Dashboard</Link>
                    </li>
                    <li>User Management</li>
                </ul>
            </div>

            <Card
                sx={{
                    boxShadow: "none",
                    borderRadius: "10px",
                    p: "25px 20px 15px",
                    mb: "15px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #EEF0F7",
                        paddingBottom: "10px",
                        mb: "20px",
                    }}
                    className="for-dark-bottom-border"
                >
                    <Typography
                        as="h3"
                        sx={{
                            fontSize: 18,
                            fontWeight: 500,
                        }}
                    >
                        Users List
                        <Typography
                            as="span"
                            sx={{
                                fontSize: 12,
                                fontWeight: 500,
                                marginLeft: 4,
                                borderBottom: "3px solid #757fef",
                                padding: "0px 5px 5px",
                            }}
                        >
                            Active (15)
                        </Typography>
                        <Link
                            href="/user-management/pending"
                            style={{ textDecoration: "none", color: "#260944" }}
                        >
                            <Typography
                                as="span"
                                sx={{
                                    fontSize: 12,
                                    fontWeight: 500,
                                    marginLeft: 4,
                                    cursor: "pointer",
                                }}
                            >
                                Pending (2)
                            </Typography>
                        </Link>
                        <Link
                            href="/user-management/invited"
                            style={{ textDecoration: "none", color: "#260944" }}
                        >
                            <Typography
                                as="span"
                                sx={{
                                    fontSize: 12,
                                    fontWeight: 500,
                                    marginLeft: 4,
                                    cursor: "pointer",
                                }}
                            >
                                Invited (2)
                            </Typography>
                        </Link>
                    </Typography>

                    <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        sx={{
                            textTransform: "capitalize",
                            borderRadius: "8px",
                            fontWeight: "500",
                            fontSize: "13px",
                            padding: "12px 20px",
                            color: "#fff !important",
                        }}
                    >
                        <AddIcon
                            sx={{ position: "relative", top: "-1px" }}
                            className="mr-5px"
                        />{" "}
                        Create New User
                    </Button>
                </Box>

                <TableContainer
                    component={Paper}
                    sx={{
                        boxShadow: "none",
                    }}
                >
                    <Table
                        sx={{ minWidth: 850 }}
                        aria-label="custom pagination table"
                        className="dark-table"
                    >
                        <TableHead sx={{ background: "#F7FAFF" }}>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "13.5px",
                                    }}
                                >
                                    Name
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "13.5px",
                                    }}
                                >
                                    Email
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "13.5px",
                                    }}
                                >
                                    Tags
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "13.5px",
                                    }}
                                >
                                    Permission
                                </TableCell>

                                <TableCell
                                    align="right"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "13.5px",
                                    }}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage + rowsPerPage
                                  )
                                : rows
                            ).map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell
                                        style={{
                                            borderBottom: "1px solid #F7FAFF",
                                            paddingTop: "13px",
                                            paddingBottom: "13px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Checkbox {...label} size="small" />
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                            className="ml-10px"
                                        >
                                            <img
                                                src={row.image}
                                                alt="User"
                                                width={40}
                                                height={40}
                                                className="borRadius100"
                                            />
                                            <Box>
                                                <Typography
                                                    as="h5"
                                                    sx={{
                                                        fontWeight: "500",
                                                        fontSize: "13.5px",
                                                    }}
                                                    className="ml-10px"
                                                >
                                                    {row.name}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize: "12px",
                                                        color: "#A9A9C8",
                                                    }}
                                                    className="ml-10px"
                                                >
                                                    {row.userName}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>

                                    <TableCell
                                        align="center"
                                        style={{
                                            borderBottom: "1px solid #F7FAFF",
                                            fontSize: "13px",
                                            paddingTop: "13px",
                                            paddingBottom: "13px",
                                        }}
                                    >
                                        {row.email}
                                    </TableCell>

                                    <TableCell
                                        align="center"
                                        style={{
                                            borderBottom: "1px solid #F7FAFF",
                                            fontSize: "13px",
                                            paddingTop: "13px",
                                            paddingBottom: "13px",
                                        }}
                                    >
                                        {row.tags}
                                    </TableCell>

                                    <TableCell
                                        align="center"
                                        style={{
                                            borderBottom: "1px solid #F7FAFF",
                                            fontSize: "13px",
                                            paddingTop: "13px",
                                            paddingBottom: "13px",
                                        }}
                                    >
                                        {row.permission ? row.permission : "-"}
                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        sx={{
                                            borderBottom: "1px solid #F7FAFF",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "inline-block",
                                            }}
                                        >
                                            <Tooltip
                                                title="Remove"
                                                placement="top"
                                            >
                                                <IconButton
                                                    aria-label="remove"
                                                    size="small"
                                                    color="danger"
                                                    className="danger"
                                                >
                                                    <DeleteIcon fontSize="inherit" />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip
                                                title="Edit"
                                                placement="top"
                                            >
                                                <IconButton
                                                    aria-label="edit"
                                                    size="small"
                                                    color="primary"
                                                    className="primary"
                                                >
                                                    <DriveFileRenameOutlineIcon fontSize="inherit" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell
                                        colSpan={5}
                                        style={{
                                            borderBottom: "1px solid #F7FAFF",
                                        }}
                                    />
                                </TableRow>
                            )}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[
                                        5,
                                        10,
                                        25,
                                        { label: "All", value: -1 },
                                    ]}
                                    colSpan={8}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            "aria-label": "rows per page",
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                    ActionsComponent={MembersLists}
                                    style={{ borderBottom: "none" }}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Card>

            {/* Create new user modal */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "#EDEFF5",
                            borderRadius: "8px",
                            padding: "20px 20px",
                        }}
                        className="bg-black"
                    >
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{
                                fontWeight: "500",
                                fontSize: "18px",
                            }}
                        >
                            Create New User
                        </Typography>

                        <IconButton
                            aria-label="remove"
                            size="small"
                            onClick={handleClose}
                            className="modal-close"
                        >
                            <ClearIcon />
                        </IconButton>
                    </Box>

                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <Box
                            sx={{
                                background: "#fff",
                                padding: "20px 20px",
                                borderRadius: "8px",
                            }}
                            className="dark-BG-101010"
                        >
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item xs={12} md={12} lg={6}>
                                    <Typography
                                        as="h5"
                                        sx={{
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            mb: "12px",
                                        }}
                                    >
                                        Image
                                    </Typography>

                                    <TextField
                                        autoComplete="image"
                                        name="image"
                                        required
                                        fullWidth
                                        id="image"
                                        type="file"
                                        autoFocus
                                        InputProps={{
                                            style: { borderRadius: 8 },
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} lg={6}>
                                    <Typography
                                        as="h5"
                                        sx={{
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            mb: "12px",
                                        }}
                                    >
                                        First Name
                                    </Typography>

                                    <TextField
                                        autoComplete="firstName"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        InputProps={{
                                            style: { borderRadius: 8 },
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} lg={6}>
                                    <Typography
                                        as="h5"
                                        sx={{
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            mb: "12px",
                                        }}
                                    >
                                        Last Name
                                    </Typography>

                                    <TextField
                                        autoComplete="lastName"
                                        name="lastName"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        autoFocus
                                        InputProps={{
                                            style: { borderRadius: 8 },
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} lg={6}>
                                    <Typography
                                        as="h5"
                                        sx={{
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            mb: "12px",
                                        }}
                                    >
                                        Email
                                    </Typography>

                                    <TextField
                                        autoComplete="email"
                                        name="email"
                                        required
                                        fullWidth
                                        id="email"
                                        label="example@info.com"
                                        autoFocus
                                        InputProps={{
                                            style: { borderRadius: 8 },
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} lg={6}>
                                    <Typography
                                        as="h5"
                                        sx={{
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            mb: "12px",
                                        }}
                                    >
                                        Tags
                                    </Typography>

                                    <TextField
                                        autoComplete="tags"
                                        name="tags"
                                        required
                                        fullWidth
                                        id="tags"
                                        label="Tags"
                                        autoFocus
                                        InputProps={{
                                            style: { borderRadius: 8 },
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} lg={6}>
                                    <Typography
                                        as="h5"
                                        sx={{
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            mb: "12px",
                                        }}
                                    >
                                        Permissions
                                    </Typography>
                                    <FormControl fullWidth required>
                                        <InputLabel id="demo-simple-select-label">
                                            Permissions
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            required
                                            value={permission}
                                            label="Permissions"
                                            onChange={handlePermissionChange}
                                            style={{ borderRadius: 8 }}
                                        >
                                            <MenuItem value={"admin"}>
                                                Admin
                                            </MenuItem>
                                            <MenuItem value={"editor"}>
                                                Editor
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} textAlign="end">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{
                                            mt: 1,
                                            textTransform: "capitalize",
                                            borderRadius: "8px",
                                            fontWeight: "500",
                                            fontSize: "13px",
                                            padding: "12px 20px",
                                            color: "#fff !important",
                                        }}
                                        onClick={handleClose}
                                        className="mr-15px"
                                    >
                                        <ClearIcon
                                            sx={{
                                                position: "relative",
                                                top: "-1px",
                                            }}
                                            className="mr-3px"
                                        />{" "}
                                        Cancel
                                    </Button>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            mt: 1,
                                            textTransform: "capitalize",
                                            borderRadius: "8px",
                                            fontWeight: "500",
                                            fontSize: "13px",
                                            padding: "12px 20px",
                                            color: "#fff !important",
                                        }}
                                    >
                                        <AddIcon
                                            sx={{
                                                position: "relative",
                                                top: "-2px",
                                            }}
                                            className="mr-3px"
                                        />{" "}
                                        Create New User
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </BootstrapDialog>

            <Snackbar
                open={openSnackBar}
                autoHideDuration={5000}
                onClose={handleCloseSnackBar}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Email Invite Sent!
                </Alert>
            </Snackbar>
        </>
    );
}
