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

function createData(name, image, userName, email, tags, permission) {
    return {
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
        "Evangelina Mcclain",
        "/images/user1.png",
        "@jstevenson5c",
        "jordansteve@gmail.com",
        "HTML, CSS & JS",
        "pending"
    ),
    createData(
        "Candice Munoz",
        "/images/user2.png",
        "@candice3unoz",
        "candicemunoz@gmail.com",
        "React, Next.js",
        "pending"
    ),
].sort((a, b) => (a.name < b.name ? -1 : 1));

export default function MembersList() {
    // Add User Permission
    const [permission, setPermission] = React.useState("");

    const handlePermissionChange = (event) => {
        setPermission(event.target.value);
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

    return (
        <>
            {/* Page title */}
            <div className={styles.pageTitle}>
                <h1>User Management</h1>
                <ul>
                    <li>
                        <Link href="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/user-management">User Management</Link>
                    </li>
                    <li>Pending Users</li>
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
                        Pending Approval List
                    </Typography>
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
        </>
    );
}
