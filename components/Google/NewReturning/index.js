import React, { Component } from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});
import styles from "@/components/Dashboard/Analytics/NewReturning/NewReturning.module.css";

class NewReturning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [5992, 2813, 1162, 136],
            options: {
                labels: [
                    "Search-mobile",
                    "Search-desktop",
                    "Maps-mobile",
                    "Maps-desktop",
                ],
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return Math.trunc(val) + "%";
                    },
                    dropShadow: {
                        enabled: false,
                        top: 1,
                        left: 1,
                        blur: 1,
                        color: "#000",
                        opacity: 0.45,
                    },
                    donut: {
                        labels: {
                            total: {
                                show: false,
                                showAlways: false,
                                label: "Total",
                                fontSize: "22px",
                                fontFamily: "Helvetica, Arial, sans-serif",
                                fontWeight: 600,
                                color: "#373d3f",
                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce(
                                        (a, b) => {
                                            return a + b;
                                        },
                                        0
                                    );
                                },
                            },
                        },
                    },
                },
            },
        };
    }
    render() {
        return (
            <>
                <Card
                    sx={{
                        boxShadow: "none",
                        borderRadius: "10px",
                        p: "25px 20px",
                        mb: "15px",
                    }}
                >
                    <Box
                        sx={{
                            borderBottom: "1px solid #EEF0F7",
                            paddingBottom: "10px",
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
                            New vs. Returning
                        </Typography>
                    </Box>

                    <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="donut"
                    />

                    <>
                        <div className={styles.infoList}>
                            <p>New</p>
                            <h5>36,868</h5>
                            <div className={styles.rightContent}>
                                <p>
                                    <i className="ri-bar-chart-fill"></i> 75%
                                </p>
                            </div>
                        </div>

                        <div className={styles.infoList}>
                            <p>Returning</p>
                            <h5>9,217</h5>
                            <div className={styles.rightContent}>
                                <p>
                                    <i className="ri-bar-chart-fill"></i> 25%
                                </p>
                            </div>
                        </div>
                    </>
                </Card>
            </>
        );
    }
}

export default NewReturning;
