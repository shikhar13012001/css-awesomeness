import React,{ useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Textarea } from '@mantine/core';
import AutoComplete from './AutoComplete';
import {addToRecord} from "../api/data"
import BudgetContext from "../context/BudgetContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ModalExpense({ opened, setOpened }) {
  const {setExpense} = React.useContext(BudgetContext);
  const [formValue, setFormValue] = useState({
    expenses: {
      category:'',
      note: '',
      price: '',
      date: '',
    },
  });
  console.log(formValue)
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormValue({
      ...formValue,
      expenses: {
        ...formValue.expenses,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleClick=async()=>{
    const {category,note,price,date}=formValue.expenses;
    // if any of the value is m=empty show error
    if(category===""||note===""||price===""||date===""){
      toast.warning('Please fill all the fields');
      return;
    }
     const data=await addToRecord({expenses:formValue.expenses})
     console.log(data);
     setOpened(false)
     setExpense(prev=>[...prev,formValue.expenses])

  }
  return (
    <>
    <ToastContainer />
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add a new Expense">
        <AutoComplete formValue={formValue} setFormValue={setFormValue} />
        <TextInput
          type="number"
          size="lg"
          label="Price"
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
        <Textarea
          type="text"
          size="lg"
          label="Note"
          name="note"
          value={formValue.expenses.note}
          onChange={handleChange}
          required
          autosize
          minRows={2}
        />
        <Button variant="outline" size="md" fullWidth sx={{ margin: '20px 0' }} onClick={handleClick}>
          Add to Expenses
        </Button>
      </Modal>
    </>
  );
}

export default ModalExpense;
