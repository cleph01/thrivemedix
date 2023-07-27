import * as React from "react";
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BillingTable = () => {
    return (
        <>
            <Card
                sx={{
                    boxShadow: "none",
                    borderRadius: "10px",
                    p: "25px 25px 20px",
                    mb: "15px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "end",
                        mb: "20px",
                    }}
                >
                    <Typography
                        as="h3"
                        sx={{
                            fontSize: 18,
                            fontWeight: 600,
                        }}
                    >
                        Monthly Subscription
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            textTransform: "capitalize",
                            borderRadius: "8px",
                            fontWeight: "600",
                            fontSize: "13px",
                            padding: "10px 20px",
                            color: "#fff !important",
                        }}
                    >
                        <AddIcon
                            sx={{ position: "relative", top: "-1px" }}
                            className="mr-5px"
                        />{" "}
                        Start / Stop
                    </Button>
                </Box>

                <TableContainer
                    component={Paper}
                    sx={{
                        boxShadow: "none",
                    }}
                >
                    <Table
                        sx={{ minWidth: 650 }}
                        aria-label="simple table"
                        className="dark-table"
                    >
                        <TableHead sx={{ background: "#F7FAFF" }}>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "13px",
                                    }}
                                >
                                    Product
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "13px",
                                    }}
                                >
                                    Status
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "13px",
                                    }}
                                >
                                    Price
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "13px",
                                    }}
                                >
                                    Quantity
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "12px",
                                        padding: "8px 10px",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src="/images/product1.png"
                                            alt="Product Img"
                                            width={50}
                                            className="borderRadius10"
                                        />
                                        <Typography
                                            sx={{
                                                fontWeight: "600",
                                                fontSize: "12px",
                                            }}
                                            className="ml-10px"
                                        >
                                            Platinum Package
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "12px",
                                        padding: "8px 10px",
                                    }}
                                >
                                    Active
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "12px",
                                        padding: "8px 10px",
                                    }}
                                >
                                    $100.00
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "12px",
                                        padding: "8px 10px",
                                    }}
                                >
                                    01
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Card
                sx={{
                    boxShadow: "none",
                    borderRadius: "10px",
                    p: "25px 25px 20px",
                    mb: "15px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "end",
                        mb: "20px",
                    }}
                >
                    <Typography
                        as="h3"
                        sx={{
                            fontSize: 18,
                            fontWeight: 600,
                        }}
                    >
                        SMS Messages Balance
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            textTransform: "capitalize",
                            borderRadius: "8px",
                            fontWeight: "600",
                            fontSize: "13px",
                            padding: "10px 20px",
                            color: "#fff !important",
                        }}
                    >
                        <AddIcon
                            sx={{ position: "relative", top: "-1px" }}
                            className="mr-5px"
                        />{" "}
                        Buy
                    </Button>
                </Box>

                <TableContainer
                    component={Paper}
                    sx={{
                        boxShadow: "none",
                    }}
                >
                    <Table
                        sx={{ minWidth: 650 }}
                        aria-label="simple table"
                        className="dark-table"
                    >
                        <TableHead sx={{ background: "#F7FAFF" }}>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "13px",
                                    }}
                                >
                                    Product
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "13px",
                                    }}
                                >
                                    Status
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "13px",
                                    }}
                                >
                                    Price
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "13px",
                                    }}
                                >
                                    Quantity
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "12px",
                                        padding: "8px 10px",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src="/images/product2.png"
                                            alt="Product Img"
                                            width={50}
                                            className="borderRadius10"
                                        />
                                        <Typography
                                            sx={{
                                                fontWeight: "600",
                                                fontSize: "12px",
                                            }}
                                            className="ml-10px"
                                        >
                                            SMS-to-Web Blocks
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "12px",
                                        padding: "8px 10px",
                                    }}
                                >
                                    Good
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "12px",
                                        padding: "8px 10px",
                                    }}
                                >
                                    $200.00
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        borderBottom: "1px solid #F7FAFF",
                                        fontSize: "12px",
                                        padding: "8px 10px",
                                    }}
                                >
                                    777 / 1000
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </>
    );
};

export default BillingTable;
