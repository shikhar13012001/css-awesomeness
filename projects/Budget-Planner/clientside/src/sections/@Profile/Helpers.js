import React from 'react';

export const ExpenseHandler = (expense) => {
  const TempObj = {};
  expense.forEach((element) => {
    const prevPrice = TempObj[element.category] || 0;
    TempObj[element.category] = prevPrice + element.price;
  });
  const Keys = Object.keys(TempObj);
  const ans = Keys.map((item) => ({ id: item, label: item, value: TempObj[item] }));

  return ans;
};

export const IncomeHandler = (income) => {
 
  const TempObj = {};
  income.forEach((element) => {
 
    const prevPrice = TempObj[element.source] || 0;
    TempObj[element.source] = prevPrice + element.price;
  });
  const Keys = Object.keys(TempObj);
  const ans = Keys.map((item) => ({ id: item, label: item, value: TempObj[item] }));
 
  return ans;
};

export const SavingsHandler=(expense,funds,stocks)=>{
    console.log(expense,funds,stocks);
    const TempObj = {};
    const ExpenseTotal=expense.reduce((acc,curr)=>{
        return acc+curr.price;
    },0);
    const FundsTotal=funds.reduce((acc,curr)=>{
        return acc+curr.price;
    },0);
    const StocksTotal=stocks.reduce((acc,curr)=>{
        let sum=0;
        
        curr.purchase.map(t=>{if(t.price){sum+=t.price*t.numberOfShares;}});
        return acc+sum;
    },0);
    const money=[ExpenseTotal,FundsTotal,StocksTotal];
    const keys=['Expense','Funds','Stocks'];
    const ans=keys.map((item,index)=>({id:item,label:item,value:money[index]}));
    
    return ans;
}