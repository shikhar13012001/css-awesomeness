import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ExpensesTable from '../components/ExpensesTable';
import StocksTable from '../components/StocksTable';
import FundsTable from '../components/FundsTable';
import { Container } from '@mui/material';
import BudgetProfile from '../components/BudgetProfile';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ModalExpense from '../components/ModalExpense';
import FundsExpense from '../components/FundsExpense';
import StocksExpense from '../components/StocksExpense';
import { useState } from 'react';
import BudgetContext from '../context/BudgetContext';
import { fetchData, getCurrentprice } from '../api/data';

export default function Expenses() {
  const [value, setValue] = React.useState(0);
  const [opened, setOpened] = useState(false);
  const [expense, setExpense] = useState([]);
  const [funds, setFunds] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [stockCurrentPrice, setStockCurrentPrice] = useState([]);
  const Modals = [
    <ModalExpense opened={opened} setOpened={setOpened} />,
    <FundsExpense opened={opened} setOpened={setOpened} />,
    <StocksExpense opened={opened} setOpened={setOpened} />,
  ];
  const Components = [<ExpensesTable />, <FundsTable />, <StocksTable />, <BudgetProfile />];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleModalOpen = () => {
    setOpened(true);
  };

  React.useEffect(() => {
    const FetchAPIData = async () => {
      const { msg: data } = await fetchData();
      console.log(data);
      setExpense(data.expenses);
      setFunds(data.funds);
      setStocks(data.stock || []);
      const Pricedata= await getCurrentprice();
      if(Pricedata.status===400)
      return;
      setStockCurrentPrice(Pricedata);
    };
    FetchAPIData();
  }, []);

  return (
    <BudgetContext.Provider
      value={{ expense, setExpense, funds, setFunds, stocks, setStocks, setStockCurrentPrice, stockCurrentPrice }}
    >
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Expenses" />
          <Tab label="Funds" />
          <Tab label="Stocks" />
          <Tab label="Budget Profile" />
        </Tabs>

        <Container>
          {value < 3 && (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 2, mb: 2 }}>
              <Fab color="primary" variant="extended" aria-label="add" onClick={handleModalOpen} sx={{ zIndex: 1 }}>
                <AddIcon />
                Add New
              </Fab>
            </Box>
          )}
          {Components[value]}
        </Container>
        {Modals[value]}
      </Box>
    </BudgetContext.Provider>
  );
}
