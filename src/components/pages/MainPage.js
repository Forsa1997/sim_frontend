import * as React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicAccordion from '../BasicAccordion';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { findAllProductionLines } from '../../actions/productionLine';
import { useDispatch } from 'react-redux';
import { findAllCars } from '../../actions/car';
import { findAllRobots } from '../../actions/robot';
import { findAllStations } from '../../actions/station';
import { TextField } from '@mui/material';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="">
                VW Production Simulator
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const theme = createTheme();

const MainPage = () => {

    const robots = useSelector(state => state.robotReducer.robots)
    const stations = useSelector(state => state.stationReducer.stations)
    const productionLines = useSelector(state => state.productionLineReducer.productionLines)
    const cars = useSelector(state => state.carReducer.cars)

    const [filterString, setFilterString] = React.useState('');

    const handleFilter = event => {
        setFilterString(event.target.value);
    };

    const filteredProductionLines = productionLines.filter(productionLine =>
        productionLine.name.toLowerCase().includes(filterString.toLowerCase())
    );

    const findRobots = (prodLineRobots) => {
        const map = new Map(Object.entries(prodLineRobots));
        const result = [];
        robots.forEach(robot => {
            for (let [k, v] of map) {
                if (v === robot.id) {
                    result.push({ robot, pos: k });
                }
            }
        });
        return result;
    }

    const findStations = (prodLineStations) => {
        const map = new Map(Object.entries(prodLineStations));
        const result = [];
        stations.forEach(station => {
            for (let [k, v] of map) {
                if (v === station.id) {
                    result.push({ station, pos: k });
                }
            }
        });
        return result;
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findAllProductionLines())
        dispatch(findAllCars())
        dispatch(findAllRobots())
        dispatch(findAllStations())
    }, [dispatch]);


    return (
        <ThemeProvider theme={theme}>
            <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid sx={{ py: 8, maxWidth: '95%' }}>
                    <Grid>
                        <Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography sx={{mr: 1, mt:1, fontSize: 20, fontWeight: 'bold' }}>Filter:</Typography>
                            <TextField
                                margin="normal"
                                type="text"
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                onChange={handleFilter}
                                sx={{ mt: 3, mb: 2 }}
                            />
                        </Box>
                        {filteredProductionLines && filteredProductionLines.length > 0 && filteredProductionLines.map((productionLine) => (
                            <BasicAccordion key={productionLine.id}
                                prodId={productionLine.id}
                                stations={findStations(productionLine.stations)}
                                robots={findRobots(productionLine.robots)}
                                name={productionLine.name}
                                car={productionLine.car}
                                status={productionLine.status}
                                report={productionLine.report}
                                cars={cars}
                                simStatus={productionLine.simStatus}
                            />
                        ))}
                    </Grid>
                </Grid>
            </main>
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Powered by Nico Masur and Christoph Ruhe
                </Typography>
                <Copyright />
            </Box>
        </ThemeProvider>
    );
}

export default MainPage;