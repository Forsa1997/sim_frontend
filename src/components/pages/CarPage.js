import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DirectionsCarSharpIcon from '@mui/icons-material/DirectionsCarSharp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { saveCar } from '../../actions/car';
import { useSnackbar } from 'notistack'

const theme = createTheme();

export default function CarPage() {

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();


  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [factor, setFactor] = React.useState("");
  const [factorError, setFactorError] = React.useState("")

  const handleSubmit = (event) => {
    const nameRegex = /^[a-zA-Z0-9 ]{2,50}$/
    if (!nameRegex.test(name)) {
      enqueueSnackbar("Der Name muss zwischen 2 - 50 Zeichen lang sein!", { variant: 'warning' })
      setNameError("Falsche Eingabe!")
      return;
    }
    setNameError("");
    const factorRegex = /^(0\.[1-9]|[1-9]\.[0-9])$/
    if (!factorRegex.test(factor)) {
      enqueueSnackbar("Es sind nur Dezimalzahlen mit einer Kommastelle von 0.1 - 9.9 erlaubt", { variant: 'warning' })
      setFactorError("Falsche Eingabe!")
      return;
    }
    setFactorError("");
    const car = {
      name: name,
      multiplier: factor
    }
    console.log(car);
    dispatch(saveCar(car))
  };

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleFactorChange = (event) => {
    setFactor(event.target.value)
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
            <DirectionsCarSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Fahrzeug
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="model"
              label="Modell"
              name="model"
              autoComplete="name"
              autoFocus
              onChange={handleNameChange}
              error={Boolean(nameError)}
              helperText={nameError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="factor"
              label="Faktor"
              type="number"
              id="factor"
              autoComplete="number"
              onChange={handleFactorChange}
              error={Boolean(factorError)}
              helperText={factorError}
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