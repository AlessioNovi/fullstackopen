import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Diagnosis, EntryWithoutId } from "../../types";
import React from "react";

interface HealthCheckEntryFormProps {
  onSubmit: (entry: EntryWithoutId) => Promise<void>
  setEntryForm: React.Dispatch<React.SetStateAction<string>>
  diagnoses: Diagnosis[]
}



const HealthCheckEntryForm = ({ onSubmit, setEntryForm, diagnoses}: HealthCheckEntryFormProps) => {
  const [diagnosesSelection, setDiagnosesSelection] = React.useState<string[]>([]);

  const handleSelectChagne = (e: SelectChangeEvent<typeof diagnosesSelection>) => {
    const {
      target: { value },
    } = e;
    setDiagnosesSelection(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      description: { value: string };
      date: { value: string };
      specialist: { value: string };
      healthCheckRating: { value: number };
    };

    const date = target.date.value.replace(/-/g, '/');
  
    const obj: EntryWithoutId = {
      description: target.description.value,
      specialist: target.specialist.value,
      date,
      healthCheckRating: target.healthCheckRating.value,
      type: 'HealthCheck'
    };

    if (diagnosesSelection.length > 1) {
      obj.diagnosisCodes = diagnosesSelection;
    }

    onSubmit(obj);
  };


  return (
    <Box component="form" onSubmit={submitForm}>
      <TextField fullWidth label="description" id="description" name="description" />
      <FormControl fullWidth>
        <InputLabel htmlFor="date" shrink>Entry date</InputLabel>
        <Input type="date" name="date" id="date" fullWidth />
      </FormControl>
      <TextField fullWidth label="specialist" id="specialist" name="specialist"/>
      {/* <TextField 
        fullWidth 
        label="diagnosisCodes" 
        id="diagnosisCodes" 
        name="diagnosisCodes"
        select
        SelectProps={ { native: true }}
        >
        {diagnoses.map(d => {
          return (
            <option key={d.code} value={d.code}>{d.code}</option>
          );
        })}
      </TextField> */}
      <FormControl fullWidth>
        <InputLabel id="diagnosisCodes-label">diagnosisCodes</InputLabel>
        <Select
          labelId="diagnosisCodes"
          label="diagnosisCodes"
          id="diagnosisCodes"
          name="diagnosisCodes"
          multiple
          fullWidth
          value={diagnosesSelection}
          onChange={handleSelectChagne}
        >
          {diagnoses.map((d) => {
            return (
              <MenuItem key={d.code} value={d.code}>{d.code}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField 
        select
        fullWidth 
        label="healthCheckRating" 
        id="healthCheckRating"
        name="healthCheckRating"
        defaultValue= ""
        SelectProps={ { native: true }}
        >
        {
        [
          <option key={0} value={0}>0 </option>,
          <option key={1} value={1}>1 </option>,
          <option key={2} value={2}>2 </option>,
          <option key={3} value={3}>3 </option>,
        ]
        }
      </TextField>
      <Button onClick={() => setEntryForm('')}>Cancel</Button>
      <Button type="submit">Add</Button>
    </Box>
  );
};

export default HealthCheckEntryForm;