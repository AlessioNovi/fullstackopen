import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Diagnosis, EntryWithoutId } from "../../types";
import React from "react";

interface HealthCheckEntryFormProps {
  onSubmit: (entry: EntryWithoutId) => Promise<void>
  setEntryForm: React.Dispatch<React.SetStateAction<string>>
  diagnoses: Diagnosis[]
}



const HospitalEntryForm = ({ onSubmit, setEntryForm, diagnoses}: HealthCheckEntryFormProps) => {
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
      dischargedate: { value: string };
      criteria: { value: string }
    };

    const date = target.date.value.replace(/-/g, '/');
    const dischargeDate = target.dischargedate.value.replace(/-/g, '/');
  
    const obj: EntryWithoutId = {
      description: target.description.value,
      specialist: target.specialist.value,
      date,
      type: 'Hospital',
      discharge: { date: dischargeDate, criteria: target.criteria.value }
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
      <FormControl fullWidth>
        <InputLabel htmlFor="dischargedate" shrink>Discharge date</InputLabel>
        <Input type="date" name="dischargedate" id="dischargedate" fullWidth />
      </FormControl>
      <TextField fullWidth label="criteria" id="criteria" name="criteria" />
      <Button onClick={() => setEntryForm('')}>Cancel</Button>
      <Button type="submit">Add</Button>
    </Box>
  );
};

export default HospitalEntryForm;