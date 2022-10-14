import React, { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Textarea } from '@mantine/core';
import { addToRecord } from '../api/data';
import { getStock, removeStock, Addtostock } from '../api/data';
import { Symbols } from '../sections/@StockPrice/Options';
import { Autocomplete, TextField } from '@mui/material';
import _ from 'lodash';
import BudgeContext from '../context/BudgetContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function StocksExpense({ opened, setOpened }) {
  const { stocks, setStocks } = React.useContext(BudgeContext);

  const [formValue, setFormValue] = useState({
    expenses: {
      symbol: '',
      quantity: '',
      price: '',
      date: '',
    },
  });
  console.log(formValue);
  const handleChange = (e) => {
    console.log(e);
    console.log(e.target.name, e.target.value);
    setFormValue({
      ...formValue,
      expenses: {
        ...formValue.expenses,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleClick = async () => {
    const { symbol, quantity, price, date } = formValue.expenses;
    // if value is empty string or 0 show error
    if (symbol === '' || quantity === '' || price === '' || date === '') {
      toast.warning('Please fill all the fields');

      return;
    }

    setOpened(false);
    const data = await Addtostock({ ...formValue.expenses });
    console.log(data);
    setStocks(data.data.stock);
  };
  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add a new Stocks">
        <ToastContainer />
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={Symbols.map((option) => ({ label: option.Symbol }))}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              expenses: {
                ...formValue.expenses,
                symbol: e.target.innerText,
              },
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
        <TextInput
          type="number"
          size="lg"
          label="Price of one Share"
          name="price"
          value={formValue.expenses.price}
          onChange={handleChange}
          required
        />
        <TextInput
          type="date"
          size="lg"
          label="Date"
          name="date"
          value={formValue.expenses.date}
          onChange={handleChange}
          required
        />
        <TextInput
          type="number"
          size="lg"
          label="Quantity"
          name="quantity"
          value={formValue.expenses.note}
          onChange={handleChange}
          required
        />
        <Button variant="outline" size="md" fullWidth sx={{ margin: '20px 0' }} onClick={handleClick}>
          Add to Stocks
        </Button>
      </Modal>
    </>
  );
}

export default StocksExpense;
