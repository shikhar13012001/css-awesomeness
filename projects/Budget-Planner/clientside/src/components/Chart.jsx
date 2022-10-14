import { Typography, Container } from '@mui/material';
import { Box, Stack, Paper } from '@mui/material';
import React from 'react';
import PieChart from '../sections/@charts/PieChart';
import { Text, Title } from '@mantine/core';
import BarChart from '../sections/@charts/BarChart';
import LineChart from '../sections/@charts/LineChart';
import BudgetContext from '../context/BudgetContext';
import { ExpenseHandler, IncomeHandler, SavingsHandler } from '../sections/@Profile/Helpers';
 
const Attr = ({ title, value, data }) => {
  console.log(data);
  return (
    <React.Fragment>
      <Title order={4} sx={{ width: '90%', marginTop: 4 }}>
        {title}
      </Title>
      <Paper
        elevation={2}
        sx={{ height: '3em', display: 'flex', alignItems: 'center', paddingLeft: 2, width: '90%', mb: 4 }}
      >
        <Text size="md">₹{data}</Text>
      </Paper>
    </React.Fragment>
  );
};

const Chart = (props) => {
  const { expense, funds, stocks ,stockCurrentPrice:stonks} = React.useContext(BudgetContext);
  
  console.log('stockCurrentPrice', stonks);
  const ExpenseData = ExpenseHandler(expense);
  const IncomeData = IncomeHandler(funds);
  const SavingsData = SavingsHandler(expense, funds, stocks);

  const suggested = [
    {
      id: 'needs',
      label: 'Needs',
      value: 185,
      color: 'hsl(120, 70%, 50%)',
    },
    {
      id: 'savings',
      label: 'Savings',
      value: 185,
      color: 'hsl(120, 70%, 50%)',
    },
    {
      id: 'desires',
      label: 'Desires',
      value: 185,
      color: 'hsl(120, 70%, 50%)',
    },
  ];

  
  const labels = stonks.map((item) => item?.name);
  console.log(labels);
  const dataset1 = stonks.map((item) => {
    if (!item) return 0;
    let sum = 0;
    item.purchaseprice.map(({ price, numberOfShares }) => {
      if(price&&numberOfShares) sum += price * numberOfShares;
       
    });
    return sum;
  });
  const dataset2 = stonks.map((item) => {
    if(!item)
    return 0;
    let sum = 0;
    const { currentprice:currentPrice } = item;
    item.purchaseprice.map(({ numberOfShares }) => {
      if (currentPrice && numberOfShares) sum += currentPrice * numberOfShares;
      sum += currentPrice * numberOfShares;
    });
    return sum;
  });
  console.log(dataset2, dataset1);
  const dataStonks = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataset1,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: dataset2,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const Lines = [
    {
      date: '09-10-21',
      balance: 23432,
    },
    {
      date: '09-11-21',
      balance: 23506,
    },
    {
      date: '09-12-21',
      balance: 23890,
    },
    {
      date: '09-13-21',
      balance: 20890,
    },
    {
      date: '09-15-21',
      balance: 25890,
    },
    {
      date: '09-16-21',
      balance: 25923,
    },
    {
      date: '09-17-21',
      balance: 26023,
    },
    {
      date: '09-18-21',
      balance: 26370,
    },
  ];
  //MM-DD-YYYY
  const Lines2 = [
    {
      date: '09-10-21',
      balance: 20000,
    },
    {
      date: '09-11-21',
      balance: 22000,
    },
    {
      date: '09-12-21',
      balance: 21870,
    },
    {
      date: '09-13-21',
      balance: 17082,
    },
    {
      date: '09-15-21',
      balance: 23890,
    },
    {
      date: '09-16-21',
      balance: 34890,
    },
    {
      date: '09-17-21',
      balance: 32219,
    },
    {
      date: '09-18-21',
      balance: 40000,
    },
  ];
  const LinesLabels = Lines.map((t) => new Date(t.date));
  console.log(LinesLabels);
  const LinesDataset1 = Lines.map((t) => t.balance);
  const LinesDataset2 = Lines2.map((t) => t.balance);
  const LinesData = {
    labels: LinesLabels,

    datasets: [
      {
        label: 'Dataset 1',
        data: LinesDataset1,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: LinesDataset2,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return (
    <Container sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Box sx={{ width: 400, height: 500, m: 5 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Total Category-wise expense
        </Typography>
        <PieChart data={ExpenseData} />
      </Box>
      <Box sx={{ width: 400, height: 500, m: 5 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Total Category-wise Income
        </Typography>
        <PieChart data={IncomeData} scheme={{ scheme: 'greens' }} />
      </Box>
      <Stack direction={{ lg: 'row', sm: 'column' }}>
        <Box sx={{ minWidth: 400, height: 500 }}>
          <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Total Category-wise Income
          </Typography>
          <PieChart data={SavingsData} scheme={{ scheme: 'oranges' }} />
        </Box>
        <Box
          sx={{ minWidth: 400, height: 500, mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: 'center', fontWeight: 'bold', width: '100%', textAlign: 'center', mb: 3 }}
          >
            Current Balance
          </Typography>
          <Attr title={'Savings'} data={SavingsData[1].value} />
          <Attr title={'Expense'} data={SavingsData[0].value} />
          <Attr title={'invested'} data={SavingsData[2].value} />
        </Box>
      </Stack>
      <BarChart data={dataStonks} />
      <LineChart data={LinesData} />
      <Box sx={{ minWidth: 400, height: 500 }}>
        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Suggested expenditure
        </Typography>
        <PieChart data={suggested} scheme={{ scheme: 'blues' }} />
      </Box>
    </Container>
  );
};

export default Chart;
