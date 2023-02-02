import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FactorySharpIcon from '@mui/icons-material/FactorySharp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { saveStation } from '../../actions/station';
import { Chip } from '@mui/material';
import { useEffect } from 'react';
import { findAllEmployees } from '../../actions/employee';
import { useSnackbar } from 'notistack'

const theme = createTheme();

const StationPage = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const employees = useSelector(state => state.employeeReducer.employees)

    useEffect(() => {
        dispatch(findAllEmployees())
        setFilteredEmployees(employees.filter(employee => !employee.assigned))
    }, [dispatch, employees]);

    // useEffect(() => {
    //     dispatch(findAllEmployees())
    //     setFilteredEmployees(employees.filter(employee => !employee.assigned))
    // }, [])

    const filterNonSelectedEmployees = () => {
        return employees.filter(employee => !employee.assigned)
    }

    const handleReloadFilteredEmployees = () => {
        setFilteredEmployees(filterNonSelectedEmployees());
    };

    const [filteredEmployees, setFilteredEmployees] = React.useState([]);
    const [selectedEmployees, setSelectedEmployees] = React.useState([]);
    const [name, setName] = React.useState("")
    const [duration, setDuration] = React.useState("")
    const [nameError, setNameError] = React.useState("");
    const [durationError, setDurationError] = React.useState("");

    const handleCreation = (event) => {
        const station = {
            name: name,
            duration: duration,
            employees: selectedEmployees
        }
        const nameRegex = /^[a-zA-Z0-9 ]{2,50}$/;
        if (!nameRegex.test(name)) {
            enqueueSnackbar("Der Name muss aus mindestens 2 Buchstaben bestehen und darf maximal 50 Zeichen lang sein!", { variant: 'warning' })
            setNameError("Falsche Eingabe!");
            return;
        }
        setNameError('');
        const decimalRegex = /^(?:0\.[1-9]|[1-9]\d{0,3}(?:\.\d{1})?|10000)$/;
        if (!decimalRegex.test(duration)) {
            enqueueSnackbar("Es sind nur Dezimalzahlen mit einer Kommastelle erlaubt: z.B. 45.3", { variant: 'warning' })
            setDurationError("Falsche Eingabe!")
            return;
        }
        setDurationError('');
        dispatch(saveStation(station))
        closeSnackbar()
        enqueueSnackbar("Arbeitsschritt erfolgreich erstellt!", { variant: 'success' })
        setSelectedEmployees([]);
        dispatch(findAllEmployees());
        handleReloadFilteredEmployees();
        setName("");
        setDuration("");
    };

    const handleSelectedEmployeesChange = (event) => {
        setSelectedEmployees(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleDurationChange = event => {
        setDuration(event.target.value)
    };

    const isContinueDisabled = selectedEmployees.length < 1;


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
                            <FactorySharpIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Arbeitsschritt erstellen
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            <FormControl fullWidth>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    value={name}
                                    onChange={handleNameChange}
                                    sx={{ mt: 3, mb: 2 }}
                                    error={Boolean(nameError)}
                                    helperText={nameError}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Arbeitsdauer"
                                    name="duration"
                                    autoComplete="number"
                                    autoFocus
                                    type="number"
                                    value={duration}
                                    onChange={handleDurationChange}
                                    sx={{ mt: 3, mb: 2 }}
                                    error={Boolean(durationError)}
                                    helperText={durationError}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
                                <InputLabel id="mutiple-chip-label">Mitarbeiter</InputLabel>
                                <Select
                                    labelId="mutiple-chip-label"
                                    id="mutiple-chip"
                                    multiple
                                    label="Mitarbeiter"
                                    name="employees"
                                    value={selectedEmployees}
                                    onChange={handleSelectedEmployeesChange}
                                    renderValue={(selected) => (
                                        <div>
                                            {selected.map((value) => (
                                                <Chip key={value.id} label={value.name} />
                                            ))}
                                        </div>
                                    )}
                                >
                                    {filteredEmployees.map((employee, index) =>
                                        <MenuItem key={index} value={employee}>{employee.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={isContinueDisabled}
                                onClick={() => handleCreation()}>
                                Erstellen
                            </Button>
                            {isContinueDisabled &&
                                <p style={{ color: "red" }}>
                                    Bitte mindestens einen Mitarbeiter auswählen!
                                </p>
                            }
                        </Box>
                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    );
}
export default StationPage;