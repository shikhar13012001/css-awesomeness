import React from 'react';
import { Container,Button,Box, Typography,Paper } from '@mui/material';

import { Text, Title } from '@mantine/core';
import SelectSymbol from "../sections/@StockPrice/Symbol"
import {fetchSymbols,lookup} from "../api/data"
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
        <Text size="md">{data}</Text>
      </Paper>
    </React.Fragment>
  );
};

const CheckStockprice = () => {
  const [stock, setStock] = React.useState([]);
  const [stockPrice, setStockPrice] = React.useState([]);
  const [stockName, setStockName] = React.useState([]);
  const [stockSymbol, setStockSymbol] = React.useState('');
 const handleChange=async(event)=>{
    const symbol=event.target.innerText;
    setStockSymbol(symbol);
    
  }

  const handleSubmit=async(event)=>{
    if(stockSymbol===''){return}
    const data = await lookup(stockSymbol);
    if(data){
      console.log(JSON.parse(data.data))
      setStock(JSON.parse(data.data));
    }
  }
  // await fetchSymbols({
  //   symbol: data.get("symbol"),
  //   history,
  // });
  // await lookup({
  //   symbol: data.get("symbol"),
  //   history,
  // });
  return (
    <Container>
      <Typography variant="h4">Check Stock Price</Typography>
      <SelectSymbol stockSymbol={stockSymbol} setStockSymbol={setStockSymbol} handleChange={handleChange} />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" sx={{ mt: 2, boxShadow: 'none' }} onClick={handleSubmit}>
          Check Stock Price
        </Button>
      </Box>
      {stockSymbol.length&&<>
      <Attr title="Symbol" data={stock.symbol} />
      <Attr title="Company" data={stock.companyName} />
      <Attr title="Latest Price" data={stock.latestPrice} />
      <Attr title="Previous Close" data={stock.previousClose} />
      </>}
    </Container>
  );
};

export default CheckStockprice;
