import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";

import OrderTable from "./BillingTable";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";

const BillingDetails = () => {
    return (
        <>
            {/* Page title */}
            <div className={styles.pageTitle}>
                <h1>Order Details</h1>
                <ul>
                    <li>
                        <Link href="/">Dashboard</Link>
                    </li>
                    <li>Order Details</li>
                </ul>
            </div>

            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
            >
                <Grid item xs={12} md={12} lg={12} xl={8}>
                    {/* OrderTable */}
                    <OrderTable />
                </Grid>
            </Grid>
        </>
    );
};

export default BillingDetails;
