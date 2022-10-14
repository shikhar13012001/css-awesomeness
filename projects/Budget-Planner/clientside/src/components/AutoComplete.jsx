import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function FreeSoloCreateOption({
    formValue,setFormValue
}) {
  const [value, setValue] = React.useState(null);
  console.log(value);
  return (
    <Autocomplete
    fullWidth
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
          });
          setFormValue({
            ...formValue,
            expenses: {
              ...formValue.expenses,
              category: newValue,
            },
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
          const obj = {
            ...formValue,
            expenses: {
              ...formValue.expenses,
              category: newValue.inputValue,
            },
          };
          console.log(obj)
          setFormValue({
            ...formValue,
            expenses: {
              ...formValue.expenses,
              category: newValue.inputValue,
            },
          });
        } else {
          setValue(newValue);
          setFormValue({
            ...formValue,
            expenses: {
              ...formValue.expenses,
              category: newValue.title,
            },
          });
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add category "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={top100Films}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      
      freeSolo
      renderInput={(params) => <TextField {...params} label="Add a Category" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'Electricity'},
  { title:'Cable'},
  { title:'Internet'},
  { title:'Water'},
  { title:'Gas'},
  { title:'Education'},
  { title:'Health'},
  { title:'Transportation'},
  { title:'Housing'},
  { title:'Food'},
  { title:'Clothing'},
  { title:'Entertainment'},
  { title:'Personal Care'},

];
