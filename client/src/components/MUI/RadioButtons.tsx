import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface RadioButtonsProps {
  label?: string;
  op1?: string; 
  op2?: string ;
  op3?: string ;
  op4?: string ;
};

const RadioButtons = ({label, op1, op2, op3, op4}: RadioButtonsProps) => {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {op1 && <FormControlLabel value={op1} control={<Radio />} label={op1} />}
        {op2 && <FormControlLabel value={op2} control={<Radio />} label={op2} />}
        {op3 && <FormControlLabel value={op3} control={<Radio />} label={op3} />}
        {op4 && <FormControlLabel value={op4} control={<Radio />} label={op4} />}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtons