import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import BudgetContext from '../context/BudgetContext';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const Row = ({ children, expandComponent, ...otherProps }) => {
  return <StyledTableRow {...otherProps}>{children}</StyledTableRow>;
};

const ExpenseTable = () => {
  const { stocks, setStocks } = React.useContext(BudgetContext);
  const rows = [];
  stocks?.map((item) => {
    item?.purchase.map((x) =>
      rows.push({ symbol: item.symbol, quantity: x.numberOfShares, price: x.price, date: item.date })
    );
  });
  // flatten stocks.purchase

  // {
  //     name: "Expense 1",
  //     note: " this is a expense stuff",
  //     category: "bills",
  //     price: "392149",
  //     date: "12-12-2020",
  //     quantity: "1",
  //   }
  // rows.concat(rows);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead sx={{ fontSize: 'bold' }}>
          <StyledTableRow>
            <StyledTableCell align="center">Symbol</StyledTableCell>
            <StyledTableCell align="center">Price&nbsp;(₹)</StyledTableCell>
            <StyledTableCell align="center">Date&nbsp;(dd-mm-yyyy)</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.symbol}
              </StyledTableCell>
              <StyledTableCell align="center">{row.price}</StyledTableCell>
              <StyledTableCell align="center">{new Date(row.date).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="center">{row.quantity}</StyledTableCell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;
