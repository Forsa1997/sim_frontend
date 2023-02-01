import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import RobotTable from './tables/RobotTable';
import StationTable from './tables/StationTable';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import StopCircleSharpIcon from '@mui/icons-material/StopCircleSharp';
import PlayCircleFilledWhiteSharpIcon from '@mui/icons-material/PlayCircleFilledWhiteSharp';
import ReportGmailerrorredSharpIcon from '@mui/icons-material/ReportGmailerrorredSharp';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useEffect } from 'react';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch } from 'react-redux';
import { startProductionLine, stopProductionLine } from '../actions/productionLine';

const BasicAccordion = (props) => {

  const [expanded, setExpanded] = React.useState(false);
  const [selectedMultiplier, setSelectedMultiplier] = React.useState(props.report.multiplier);
  const [car, setCar] = React.useState(props.car);

  const dispatch = useDispatch()

  useEffect(() => {
    setSelectedMultiplier(props.report.multiplier)
    setCar(props.car)
  }, [props.report.multiplier, props.car]);

  const handleClick = (event) => {
    if (expanded) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }

  const handleChange = (event) => {
    setCar(props.cars.find(car => car.id === event.target.value))
  };

  const startSimulation = () => {
    console.log(props.prodId, selectedMultiplier, car.id)
    dispatch(startProductionLine(props.prodId, selectedMultiplier, car.id))
  }

  const stopSimulation = () => {
    dispatch(stopProductionLine(props.prodId))
  }

  const handleMultiplierChange = (event) => {
    setSelectedMultiplier(event.target.value);
  };

  return (
    <div style={{ paddingBottom: '20px' }}>
      <Accordion expanded={expanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={handleClick} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          align="center"
        >
          <Grid container direction="row" alignItems="center">
            <Grid container direction="row" alignItems="center">
              <Button disabled={props.status === "incomplete"} style={{ marginLeft: '8px', marginRight: "8px" }}>{props.simStatus === "stopped" ? <PlayCircleFilledWhiteSharpIcon onClick={() => startSimulation()} style={{ color: 'green', fontSize: '40px' }} />
                : <StopCircleSharpIcon onClick={() => stopSimulation()} style={{ color: 'red', fontSize: '40px' }} />}</Button>
              Status: {props.status === "runnable" ? <CheckCircleOutlineSharpIcon style={{ marginLeft: '8px', marginRight: "8px", color: 'green', fontSize: '40px' }} />
                : <ReportGmailerrorredSharpIcon style={{ marginLeft: '8px', marginRight: "8px", color: 'red', fontSize: '40px' }} />}
            </Grid>
            <Grid>
              <FormControl>
                <FormLabel id="controlled-radio-buttons-group">Simulationsgeschwindigkeit</FormLabel>
                <RadioGroup row
                  aria-labelledby="radio-button-row"
                  name="row-radio-buttons-group"
                  onChange={handleMultiplierChange}
                  value={selectedMultiplier} >
                  <FormControlLabel disabled={props.simStatus === "running"} value="0.5" control={<Radio />} label="0.5" />
                  <FormControlLabel disabled={props.simStatus === "running"} value="1" control={<Radio />} label="1" />
                  <FormControlLabel disabled={props.simStatus === "running"} value="3" control={<Radio />} label="3" />
                  <FormControlLabel disabled={props.simStatus === "running"} value="10" control={<Radio />} label="10" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid >
          <Grid item container direction="column" alignItems="center" alignContent="center" justifyContent="center">
            <Typography sx={{ mb: 6, fontSize: 20, fontWeight: 'bold' }}>{props.name}</Typography>
            <Typography>{props.report.prodAmount} {props.report.carName} im letzten Durchlauf produziert</Typography>
          </Grid>
          <Grid item container alignItems="center" alignContent="center" justifyContent="flex-end" style={{ marginRight: '8px' }}>
            <Typography style={{ marginRight: '8px' }}>Aktuelles Fahrzeug: </Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="simple-select-label">Modell</InputLabel>
                <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  value={car.id}
                  label="Fahrzeug"
                  onChange={handleChange}
                  disabled={props.simStatus === "running"}
                >
                  {props.cars.map((car, index) =>
                    <MenuItem key={index} value={car.id}>{car.name}</MenuItem>
                  )}
                </Select>
              </FormControl>
              <Typography>Faktor: {car.multiplier}</Typography>
            </Box>
          </Grid>
        </AccordionSummary>
        <AccordionDetails style={{ height: '450px' }}>
          <Grid container direction="row" justifyContent="center">
            <RobotTable rows={props.robots} />
            <StationTable rows={props.stations} />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default BasicAccordion;