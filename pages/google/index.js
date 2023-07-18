import Grid from "@mui/material/Grid";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import Features from "@/components/Google/Features";

import AudienceOverview from "@/components/Google/AudienceOverview";
import VisitsByDayAndNetIncome from "@/components/Google/VisitsByDayAndNetIncome/index";
import SalesAnalytics from "@/components/Google/SalesAnalytics";
import TotalRevenue from "@/components/Google/TotalRevenue";

import SessionsByCountries from "@/components/Google/SessionsByCountries";
import TotalTransactions from "@/components/Google/TotalTransactions";
import BrowserUsedAndTrafficReports from "@/components/Google/BrowserUsedAndTrafficReports";

import NewReturning from "@/components/Google/NewReturning";
import Gender from "@/components/Google/Gender";
import VisitorsAge from "@/components/Google/VisitorsAge";
import SessionsDevice from "@/components/Google/SessionsDevice";

export default function Analytics() {
    return (
        <>
            {/* Page title */}
            <div className={styles.pageTitle}>
                <h1>Analytics</h1>
                <ul>
                    <li>
                        <Link href="/analytics/">Dashboard</Link>
                    </li>
                    <li>Analytics</li>
                </ul>
            </div>

            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            >
                <Grid item xs={12} md={12} lg={12} xl={8}>
                    {/* Features */}
                    <Features />

                    {/* AudienceOverview */}
                    <AudienceOverview />
                </Grid>

                <Grid item xs={12} md={12} lg={12} xl={4}>
                    {/* VisitsByDayAndNetIncome */}
                    <VisitsByDayAndNetIncome />
                </Grid>

                <Grid item xs={12} md={12} lg={12} xl={8}>
                    {/* Features */}
                    <Features />

                    {/* AudienceOverview */}
                    <AudienceOverview />
                </Grid>
            </Grid>

            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            >
                <Grid item xs={12} md={12} lg={12} xl={8}>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                    >
                        <Grid item xs={12} md={8}>
                            {/* SalesAnalytics */}
                            <SalesAnalytics />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            {/* TotalRevenue */}
                            <TotalRevenue />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={12} lg={12} xl={4}>
                    {/* SessionsByCountries */}
                    <SessionsByCountries />

                    {/* TotalTransactions */}
                    <TotalTransactions />
                </Grid>
            </Grid>

            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            >
                <Grid item xs={12} md={12} lg={12} xl={8}>
                    {/* BrowserUsedAndTrafficReports */}
                    <BrowserUsedAndTrafficReports />
                </Grid>
            </Grid>

            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            >
                <Grid item xs={12} md={6} lg={6} xl={3}>
                    {/* NewReturning */}
                    <NewReturning />
                </Grid>

                <Grid item xs={12} md={6} lg={6} xl={3}>
                    {/* Gender */}
                    <Gender />
                </Grid>

                <Grid item xs={12} md={6} lg={6} xl={3}>
                    {/* VisitorsAge */}
                    <VisitorsAge />
                </Grid>

                <Grid item xs={12} md={6} lg={6} xl={3}>
                    {/* SessionsDevice */}
                    <SessionsDevice />
                </Grid>
            </Grid>
        </>
    );
}
