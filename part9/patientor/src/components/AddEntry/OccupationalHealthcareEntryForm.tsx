import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Diagnosis, EntryWithoutId } from "../../types";
import React, { useState } from "react";

interface HealthCheckEntryFormProps {
  onSubmit: (entry: EntryWithoutId) => Promise<void>
  setEntryForm: React.Dispatch<React.SetStateAction<string>>
  diagnoses: Diagnosis[]
}



const OccupationalHealthcareEntryForm = ({ onSubmit, setEntryForm, diagnoses}: HealthCheckEntryFormProps) => {
  const [diagnosesSelection, setDiagnosesSelection] = React.useState<string[]>([]);
  const [toggleSickLeave, setToggleSickLeave] = useState(false);

  const handleSelectChagne = (e: SelectChangeEvent<typeof diagnosesSelection>) => {
    const {
      target: { value },
    } = e;
    setDiagnosesSelection(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      description: { value: string };
      date: { value: string };
      specialist: { value: string };
      employerName: { value: string };
      startDate: { value: string };
      endDate: { value: string };
    };

    const date = target.date.value.replace(/-/g, '/');
  
    const obj: EntryWithoutId = {
      description: target.description.value,
      specialist: target.specialist.value,
      date,
      type: 'OccupationalHealthcare',
      employerName: target.employerName.value
    };

    if (diagnosesSelection.length > 1) {
      obj.diagnosisCodes = diagnosesSelection;
    }

    if (target.startDate && target.endDate) {
      const startDate = target.startDate.value.replace(/-/g, '/');
      const endDate = target.endDate.value.replace(/-/g, '/');
      obj.sickLeave = { startDate, endDate };
    }

    onSubmit(obj);
  };


  return (
    <Box component="form" onSubmit={submitForm}>
      <TextField fullWidth label="description" id="description" name="description" sx={{ marginTop: 1}}/>
      <FormControl fullWidth sx={{ marginTop: 2}}>
        <InputLabel htmlFor="date" shrink>Entry date</InputLabel>
        <Input type="date" name="date" id="date" fullWidth />
      </FormControl>
      <TextField fullWidth label="specialist" id="specialist" name="specialist" sx={{ marginTop: 1}}/>
      <FormControl fullWidth sx={{ marginTop: 1}}>
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
      <TextField fullWidth label="employer name" id="employerName" name="employerName" sx={{ marginTop: 1}}/>
      {toggleSickLeave && (
        <>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel htmlFor="startDate" shrink>Start date</InputLabel>
          <Input type="date" name="startDate" id="startDate" fullWidth />
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel htmlFor="endDate" shrink>End date</InputLabel>
          <Input type="date" name="endDate" id="endDate" fullWidth />
        </FormControl>
        </>
      )}
      <Button sx={{ marginTop: 1}} onClick={() => setToggleSickLeave(!toggleSickLeave)}>Toggle Sick Leave Entry</Button>
      <Button sx={{ marginTop: 1}} onClick={() => setEntryForm('')}>Cancel</Button>
      <Button sx={{ marginTop: 1}} type="submit">Add</Button>
    </Box>
  );
};

export default OccupationalHealthcareEntryForm;