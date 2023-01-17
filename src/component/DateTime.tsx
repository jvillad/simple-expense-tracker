import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function BasicDateTimePicker() {
  const [value, setValue] = useState<Dayjs | null>(dayjs('2023-0-17'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(props) => <TextField {...props} />}
        label="Date today"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
export default BasicDateTimePicker;
