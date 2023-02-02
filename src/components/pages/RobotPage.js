import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SmartToySharpIcon from '@mui/icons-material/SmartToySharp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { saveRobot } from '../../actions/robot';
import { useSnackbar } from 'notistack'

const theme = createTheme();

export default function RobotPage() {

    const dispatch = useDispatch();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [name, setName] = React.useState("");
    const [nameError, setNameError] = React.useState("");
    const [duration, setDuration] = React.useState("");
    const [durationError, setDurationError] = React.useState("")

    const handleSubmit = (event) => {
        const nameRegex = /^[a-zA-Z0-9 ]{2,50}$/
        if (!nameRegex.test(name)) {
            enqueueSnackbar("Der Name muss zwischen 2 - 50 Zeichen lang sein!", { variant: 'warning' })
            setNameError("Falsche Eingabe!")
            return;
        }
        setNameError("");
        const decimalRegex = /^(?:0\.[1-9]|[1-9]\d{0,3}(?:\.\d{1})?|10000)$/;
        if (!decimalRegex.test(duration)) {
            enqueueSnackbar("Es sind nur Dezimalzahlen mit einer Kommastelle erlaubt: z.B. 45.3", { variant: 'warning' })
            setDurationError("Falsche Eingabe!")
            return;
        }
        setDurationError("");
        const robot = {
            name: name,
            duration: duration
        }
        closeSnackbar()
        enqueueSnackbar("Roboter erfolgreich erstellt!", { variant: 'success' })
        dispatch(saveRobot(robot))
        setName("")
        setDuration("")
    };

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleDurationChange = event => {
        setDuration(event.target.value)
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
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
                        <SmartToySharpIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Roboter
                    </Typography>
                    <Box sx={{ mt: 1 }}>
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
                            name="duration"
                            label="Arbeitsdauer"
                            type="number"
                            id="duration"
                            autoComplete="number"
                            value={duration}
                            onChange={handleDurationChange}
                            sx={{ mt: 3, mb: 2 }}
                            error={Boolean(durationError)}
                            helperText={durationError}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Erstellen
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}