import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function SimpleTable() {
    const [statistics, setStatistics] = useState([]);
    const [countries, setCountries] = useState([]);
    const classes = useStyles();

    const getStatistics = async () => {
        const res = await fetch("https://covid-193.p.rapidapi.com/statistics", {
            method: "GET",
            headers: {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "db0d3fc08amshc4197240e38cd89p1931f5jsnf44535148a7f",
            },
        });
        const data = await res.json();
        console.log(data.response);
        setStatistics(data.response);
    };

    const getCountries = async () => {
        const res = await fetch("https://covid-193.p.rapidapi.com/countries", {
            method: "GET",
            headers: {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "db0d3fc08amshc4197240e38cd89p1931f5jsnf44535148a7f",
            },
        });
        const data = await res.json();
        console.log(data.response);
        setCountries(data.response);
    };

    useEffect(() => {
        getStatistics();
    }, [statistics.length]);

    useEffect(() => {
        getCountries();
    }, [countries.length]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Country</TableCell>
                        <TableCell align='right'>Active</TableCell>
                        <TableCell align='right'>Deaths</TableCell>
                        <TableCell align='right'>Recovered</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component='th' scope='row'>
                            VietNam
                        </TableCell>
                        <TableCell align='right'>235</TableCell>
                        <TableCell align='right'>0</TableCell>
                        <TableCell align='right'>200</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
