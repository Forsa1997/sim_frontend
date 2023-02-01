import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import PrecisionManufacturingSharpIcon from '@mui/icons-material/PrecisionManufacturingSharp';
import PersonIcon from '@mui/icons-material/Person';
import SmartToySharpIcon from '@mui/icons-material/SmartToySharp';
import DirectionsCarSharpIcon from '@mui/icons-material/DirectionsCarSharp';
import FactorySharpIcon from '@mui/icons-material/FactorySharp';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

function ResponsiveAppBar() {

    const navigate = useNavigate();

    const navigateToProductionLine = (event) => {
        navigate("/productionLine")
    }

    const navigateToStation = (event) => {
        navigate("/station")
    }

    const navigateToRobot = (event) => {
        navigate("/robot")
    }

    const navigateToEmployee = (event) => {
        navigate("/employee")
    }

    const navigateToCar = (event) => {
        navigate("/car")
    }




    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters>
                    <PrecisionManufacturingSharpIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        PROSIM
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            key="productionLine"
                            onClick={navigateToProductionLine}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Grid container direction="row" alignItems="center">
                                <Typography>Produktionslinie</Typography>
                                <PrecisionManufacturingSharpIcon />
                            </Grid>
                        </Button>
                        <Button
                            key="station"
                            onClick={navigateToStation}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Grid container direction="row" alignItems="center">
                                <Typography>Arbeitsschritt</Typography>
                                <FactorySharpIcon />
                            </Grid>
                        </Button>
                        <Button
                            key="employee"
                            onClick={navigateToEmployee}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Grid container direction="row" alignItems="center">
                                <Typography>Mitarbeiter</Typography>
                                <PersonIcon />
                            </Grid>
                        </Button>
                        <Button
                            key="robot"
                            onClick={navigateToRobot}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Grid container direction="row" alignItems="center">
                                <Typography>Roboter</Typography>
                                <SmartToySharpIcon />
                            </Grid>
                        </Button>
                        <Button
                            key="car"
                            onClick={navigateToCar}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Grid container direction="row" alignItems="center">
                                <Typography>Fahrzeuge</Typography>
                                <DirectionsCarSharpIcon />
                            </Grid>
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;