import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { saveEmployee } from '../../actions/employee';
import { useSnackbar } from 'notistack';

const theme = createTheme();

export default function Create() {

    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const [error, setError] = React.useState('');
    const [name, setName] = React.useState("");

    const handleSubmit = (event) => {
        const nameRegex = /^[a-zA-Z ]{2,50}$/;
        const employee = {
            name: name
        }
        if (!nameRegex.test(employee.name)) {
            enqueueSnackbar("Der Name muss aus mindestens 2 Buchstaben bestehen und darf maximal 50 Zeichen lang sein!", {variant: 'warning'})
            setError("Falsche Eingabe!");
            return;
        }
        setError('');
        console.log(employee);
        dispatch(saveEmployee(employee))
    };

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

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
                        <PersonIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Mitarbeiter
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
                            value={name}
                            autoFocus
                            onChange={handleNameChange}
                            error={Boolean(error)}
                            helperText={error}
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
