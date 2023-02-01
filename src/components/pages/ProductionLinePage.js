import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PrecisionManufacturingSharpIcon from '@mui/icons-material/PrecisionManufacturingSharp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Chip } from '@mui/material';
import { useEffect } from 'react';
import { findAllRobots } from '../../actions/robot';
import { findAllStations } from '../../actions/station';
import { findAllCars } from '../../actions/car';
import { saveProductionLine } from '../../actions/productionLine';
import { useSnackbar } from 'notistack';

const theme = createTheme();

const ProductionLinePage = () => {

    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        dispatch(findAllRobots())
        dispatch(findAllStations())
        dispatch(findAllCars())
    }, [dispatch]);

    const stations = useSelector(state => state.stationReducer.stations)
    const robots = useSelector(state => state.robotReducer.robots)
    const cars = useSelector(state => state.carReducer.cars)

    const [car, setCar] = React.useState(cars[0]);
    const [selectedSteps, setSelectedSteps] = React.useState([]);
    const [name, setName] = React.useState("");
    const [nameError, setNameError] = React.useState("");

    const handleCreation = (event) => {
        const nameRegex = /^[a-zA-Z0-9 ]{2,50}$/;
        if (!nameRegex.test(name)) {
            enqueueSnackbar("Der Name muss aus mindestens 2 Buchstaben bestehen und darf maximal 50 Zeichen lang sein!", { variant: 'warning' })
            setNameError("Falsche Eingabe!");
            return;
        }
        setNameError('');

        const robotsMap = new Map();
        const stationsMap = new Map();

        selectedSteps.forEach((entry, index) => {
            if (isStation(entry)) {
                stationsMap.set(index + 1, entry.id)
            } else {
                robotsMap.set(index + 1, entry.id)
            }
        })

        const robotsObj = Array.from(robotsMap.entries()).reduce((acc, [key, value]) => {
            acc[key] = value
            return acc;
        }, {});
        const stationsObj = Array.from(stationsMap.entries()).reduce((acc, [key, value]) => {
            acc[key] = value
            return acc;
        }, {});

        const prodLine = {
            name: name,
            status: "runnable",
            simStatus: "stopped",
            car: car,
            robots: robotsObj,
            stations: stationsObj,
            report: {
                carName: "none"
            }
        }

        dispatch(saveProductionLine(prodLine))
    };

    const handleChange = (event) => {
        const car = cars.filter(c => c.name === event.target.value)[0]
        setCar(car);
    };

    const handleSelectedStepsChange = (event) => {
        setSelectedSteps(event.target.value);
    };


    const [isAllowed, setIsAllowed] = React.useState(false);


    const isStation = React.useCallback((obj) => {
        return stations.find(s => {
            return s === obj
        })
    }, [stations])

    const isRobot = React.useCallback((obj) => {
        return robots.find(s => {
            return s === obj
        })
    }, [robots])


    useEffect(() => {
        setIsAllowed(selectedSteps.filter(e => isStation(e)).length + selectedSteps.filter(e => isRobot(e)).length >= 3)
    }, [selectedSteps, isRobot, isStation])

    return (
        <ThemeProvider theme={theme}>
            <div sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
            }}>
                <Container>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <PrecisionManufacturingSharpIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Produktionslinie
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={name}
                                onChange={e => setName(e.target.value)}
                                sx={{ mt: 3, mb: 2 }}
                                error={Boolean(nameError)}
                                helperText={nameError}
                            />
                            <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
                                <InputLabel id="simple-select-label">Fahrzeug</InputLabel>
                                <Select
                                    labelId="simple-select-label"
                                    id="simple-select"
                                    value={car.name}
                                    label="Fahrzeug"
                                    onChange={handleChange}
                                >
                                    {cars.map((car, index) =>
                                        <MenuItem key={index} value={car.name}>{car.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
                                <InputLabel id="mutiple-chip-label">Produktionsschritt</InputLabel>
                                <Select
                                    labelId="mutiple-chip-label"
                                    id="mutiple-chip"
                                    multiple
                                    label="Produktionsschritt"
                                    value={selectedSteps}
                                    onChange={handleSelectedStepsChange}
                                    renderValue={(selected) => (
                                        <div>
                                            {selected.map((value) => (
                                                <Chip key={(isStation(value) ? "s" : "r") + value.id} label={(isStation(value) ? "Arbeitsschritt" : "Roboter") + ": " + value.name} />
                                            ))}
                                        </div>
                                    )}
                                >
                                    <ListSubheader>Roboter</ListSubheader>
                                    {robots.map((robot, index) =>
                                        <MenuItem key={index + "r"} id="robot" value={robot}>{robot.name}</MenuItem>
                                    )}
                                    <ListSubheader>Arbeitsschritte</ListSubheader>
                                    {stations.map((station, index) =>
                                        <MenuItem key={index + "s"} id="station" value={station}>{station.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={!isAllowed}
                                onClick={handleCreation}>
                                Erstellen
                            </Button>
                            {!isAllowed &&
                                <p style={{ color: "red" }}>
                                    Bitte mindestens 3 Roboter/Arbeitsschritte auswählen!
                                </p>
                            }
                        </Box>
                    </Box>
                </Container>
            </div>
        </ThemeProvider >
    );
}
export default ProductionLinePage;